# create fake portfolio data for 100 clients with random stocks and quantities
import json
import random
import uuid
from datetime import date, timedelta

from faker import Faker

TICKERS = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "BRK.B",
    "JPM", "V", "JNJ", "WMT", "PG", "DIS", "MA", "HD", "UNH", "BAC",
    "VZ", "PFE", "ADBE", "NFLX", "CRM", "INTC", "CSCO", "PEP", "KO",
    "XOM", "CVX", "MRK", "ORCL", "NKE", "ABT", "T", "MCD", "CMCSA",
    "TXN", "LLY", "COST", "NEE", "SBUX", "BMY", "QCOM", "MDT", "HON",
    "UPS", "LOW", "AXP", "IBM", "AMGN", "AMD", "GE"
]

NUM_CLIENTS = 100
MIN_POSITIONS = 3
MAX_POSITIONS = 8
MIN_QUANTITY = 10
MAX_QUANTITY = 500
MIN_PRICE = 10.0
MAX_PRICE = 650.0
YEARS_LOOKBACK = 6
OUTPUT_FILE = "fake_client_portfolios.json"

faker = Faker()


def random_joined_date():
    end = date.today()
    start = end - timedelta(days=365 * YEARS_LOOKBACK)
    random_days = random.randint(0, (end - start).days)
    return (start + timedelta(days=random_days)).isoformat()


def random_positions():
    count = random.randint(MIN_POSITIONS, MAX_POSITIONS)
    positions = []
    for ticker in random.sample(TICKERS, count):
        quantity = random.randint(MIN_QUANTITY, MAX_QUANTITY)
        average_buy_price = round(random.uniform(MIN_PRICE, MAX_PRICE), 2)
        positions.append({
            "ticker": ticker,
            "quantity": quantity,
            "average_buy_price": average_buy_price,
        })
    return positions


def portfolio_value_from_positions(positions):
    total = sum(pos["quantity"] * pos["average_buy_price"] for pos in positions)
    cash_buffer = round(random.uniform(0.0, total * 0.08), 2)
    return round(total + cash_buffer, 2)


def create_fake_portfolio():
    positions = random_positions()
    return {
        "client_id": str(uuid.uuid4()),
        "name": faker.name(),
        "email": faker.unique.email(),
        "phone": faker.phone_number(),
        "address": faker.address().replace("\n", ", "),
        "joined_date": random_joined_date(),
        "portfolio_value": portfolio_value_from_positions(positions),
        "positions": positions,
    }


def generate_portfolios(count=NUM_CLIENTS):
    return [create_fake_portfolio() for _ in range(count)]


def write_portfolios_to_file(portfolios, filename=OUTPUT_FILE):
    with open(filename, "w", encoding="utf-8") as json_file:
        json.dump(portfolios, json_file, indent=2)

# Generate client data for API use
clients = generate_portfolios()

if __name__ == "__main__":
    portfolios = generate_portfolios()
    write_portfolios_to_file(portfolios)
    print(f"Generated {len(portfolios)} fake client portfolios into {OUTPUT_FILE}")



