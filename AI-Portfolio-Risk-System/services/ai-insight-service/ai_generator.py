# generate portfolio risk explanation based on stock exposure and return severity action and disclaimer
import json
import random

def generate_risk_explanation(client, high_exposure_positions):
    # Placeholder implementation - replace with actual AI logic
    explanation = f"Client {client.get('name')} has high exposure in the following stocks:"
    for pos in high_exposure_positions:
        explanation += f"\n  - {pos['ticker']}: {pos['pct_of_portfolio'] * 100:.2f}% of portfolio"
    return explanation

def get_severity_action(client, high_exposure_positions):
    # Placeholder implementation - replace with actual AI logic
    severity = random.choice(["low", "medium", "high"])
    action = random.choice(["review", "adjust", "diversify"])
    return severity, action

def get_disclaimer():
    return "This is a simulated risk assessment. Please consult with a financial advisor for personalized advice."


def generate_risk_insight(client, high_exposure_positions):
    severity, action = get_severity_action(client, high_exposure_positions)
    return {
        "client_id": client.get("client_id"),
        "name": client.get("name"),
        "severity": severity,
        "action": action,
        "insight": generate_risk_explanation(client, high_exposure_positions),
        "high_exposure_positions": high_exposure_positions,
        "disclaimer": get_disclaimer(),
    }


if __name__ == "__main__":
    sample_client = {
        "client_id": "sample-client-001",
        "name": "Sample Investor",
    }
    sample_positions = [
        {"ticker": "AAPL", "pct_of_portfolio": 0.32},
        {"ticker": "TSLA", "pct_of_portfolio": 0.25},
    ]
    risk_insight = generate_risk_insight(sample_client, sample_positions)
    
    print("\n" + "=" * 60)
    print("🤖 AI PORTFOLIO RISK INSIGHT")
    print("=" * 60)
    print(f"👤 Client: {risk_insight['name']}")
    print(f"\n🚨 Severity: {risk_insight['severity'].upper()}")
    print(f"\n💡 Suggested Action: {risk_insight['action']}")
    print("\n📊 AI Risk Explanation:")
    print(risk_insight["insight"])
    print("\n📈 High Exposure Holdings:")
    for stock in risk_insight["high_exposure_positions"]:
        pct = stock["pct_of_portfolio"] * 100
        print(f"⚠ {stock['ticker']}: {pct:.2f}% exposure")
    print("\n📌 Disclaimer:")
    print(risk_insight["disclaimer"])
    print("=" * 60)
    print(json.dumps(risk_insight, indent=2))