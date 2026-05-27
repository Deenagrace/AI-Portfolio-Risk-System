# calculate portfolio value and detect stock exposure above a threshold
import json
from pathlib import Path
from typing import List, Dict


def _position_ticker(position: Dict) -> str:
    return position.get("ticker") or position.get("symbol") or position.get("stock")


def _position_price(position: Dict) -> float:
    # Prefer an explicit price field, then average_buy_price, otherwise 0.0
    for key in ("price", "current_price", "average_buy_price", "avg_price"):
        if key in position and isinstance(position[key], (int, float)):
            return float(position[key])
    return 0.0


def calculate_portfolio_value(positions: List[Dict]) -> float:
    """Return total market value for a list of positions.

    Positions are dicts that should include `quantity` and one of `price` or
    `average_buy_price`. If a position lacks a price it is treated as zero.
    """
    total_value = 0.0
    for pos in positions:
        quantity = pos.get("quantity", 0)
        price = _position_price(pos)
        try:
            total_value += float(quantity) * float(price)
        except Exception:
            continue
    return round(total_value, 2)


def detect_high_exposure(positions: List[Dict], threshold: float = 0.2) -> List[Dict]:
    """Return positions whose value / portfolio_value > threshold.

    The returned dicts include ticker, quantity, price, value and pct_of_portfolio.
    """
    portfolio_value = calculate_portfolio_value(positions)
    if portfolio_value <= 0:
        return []

    high = []
    for pos in positions:
        ticker = _position_ticker(pos)
        quantity = pos.get("quantity", 0)
        price = _position_price(pos)
        value = round(quantity * price, 2)
        pct = value / portfolio_value if portfolio_value else 0.0
        if pct > threshold:
            high.append({
                "ticker": ticker,
                "quantity": quantity,
                "price": price,
                "value": value,
                "pct_of_portfolio": round(pct, 4),
            })
    return high
def detect_allocation_drift(
    actual_allocations,
    target_allocations,
    threshold=5
):

    alerts=[]

    for sector,target in target_allocations.items():

        actual=actual_allocations.get(sector,0)

        drift=abs(actual-target)

        if drift>threshold:

            alerts.append({

                "sector":sector,

                "actual":actual,

                "target":target,

                "drift":drift

            })

    return alerts
def detect_daily_drop(
    previous_value,
    current_value,
    threshold=3
):

    drop=((previous_value-current_value)
          /previous_value)*100

    if drop>threshold:

        return {

            "risk":True,

            "drop":round(drop,2)

        }

    return {

        "risk":False
    }


def format_portfolio_summary(client: Dict, top_n: int = 5, exposure_threshold: float = 0.2) -> str:
    name = client.get("name") or client.get("client_name") or client.get("client_id")
    client_id = client.get("client_id") or client.get("id")
    positions = client.get("positions", [])
    # normalize positions: copy keys so helper functions work
    normalized = []
    for p in positions:
        # support both `ticker` and `symbol`
        normalized.append(dict(p))

    portfolio_value = client.get("portfolio_value") or calculate_portfolio_value(normalized)

    # compute top holdings
    holdings = []
    for p in normalized:
        ticker = _position_ticker(p) or "<unknown>"
        qty = p.get("quantity", 0)
        price = _position_price(p)
        value = round(qty * price, 2)
        holdings.append({"ticker": ticker, "quantity": qty, "price": price, "value": value})
    holdings.sort(key=lambda x: x["value"], reverse=True)

    high = detect_high_exposure(normalized, threshold=exposure_threshold)

    lines = []
    lines.append("=" * 60)
    lines.append(f"Client: {name}  (id: {client_id})")
    lines.append(f"Total portfolio value: ${portfolio_value:,.2f}")
    lines.append("Top holdings:")
    for h in holdings[:top_n]:
        lines.append(f"  - {h['ticker']}: {h['quantity']} shares @ ${h['price']:,.2f} = ${h['value']:,.2f}")

    if high:
        lines.append("")
        lines.append("🚨 RISK ALERTS 🚨")
        lines.append("-" * 40)

        for h in high:
            pct = h["pct_of_portfolio"] * 100
            lines.append(
                f"⚠ {h['ticker']} exceeds exposure limit "
                f"with ${h['value']:,.2f} ({pct:.2f}%)"
            )

        lines.append("-" * 40)
    else:
        lines.append("")
        lines.append("✅ No exposure risks detected.")

    return "\n".join(lines)


def _load_portfolios_from_file(path: Path) -> List[Dict]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as fh:
        return json.load(fh)


if __name__ == "__main__":
    import sys

    # Look for fake_client_portfolios.json in several likely locations
    candidates = [
        Path(__file__).resolve().parent / "fake_client_portfolios.json",
        Path(__file__).resolve().parent.parent / "portfolio-service" / "fake_client_portfolios.json",
        Path(__file__).resolve().parent.parent.parent / "services" / "portfolio-service" / "fake_client_portfolios.json",
        Path.cwd() / "services" / "portfolio-service" / "fake_client_portfolios.json",
    ]

    data_file = None
    for p in candidates:
        if p.exists():
            data_file = p
            break

    if data_file is None:
        print("No portfolios found; checked:")
        for p in candidates:
            print(" -", p)
        sys.exit(1)

    portfolios = _load_portfolios_from_file(data_file)

    # optional limit: `python risk_calculator.py 10` prints first 10
    try:
        limit = int(sys.argv[1]) if len(sys.argv) > 1 else None
    except Exception:
        limit = None

    to_print = portfolios if limit is None else portfolios[:limit]
    for client in to_print:
        summary = format_portfolio_summary(client)
        print(summary)
    target={

"Technology":25,

"Healthcare":25,

"Finance":25,

"Energy":25

}

actual={

"Technology":34,

"Healthcare":21,

"Finance":20,

"Energy":25

}

drifts=detect_allocation_drift(
actual,
target
)

print("\n🚨 Allocation Drift Alerts")

for d in drifts:

    print(
        f"{d['sector']} drifted "
        f"{d['drift']}%"
    )

result=detect_daily_drop(
100000,
95000
)

if result["risk"]:

    print(
    f"\n🚨 Daily drop detected:"
    )

    print(
    f"{result['drop']}%"
    )