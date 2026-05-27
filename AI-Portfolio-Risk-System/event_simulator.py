import time

events = [

    {
        "event":"PriceUpdated",
        "data":"TSLA price changed to $315"
    },

    {
        "event":"RiskThresholdBreached",
        "data":"TSLA exposure exceeded 20%"
    },

    {
        "event":"AIInsightGenerated",
        "data":"AI recommends diversification"
    }

]

for e in events:

    print("\n"+"="*60)

    print("EVENT TYPE:",e["event"])

    print("MESSAGE:",e["data"])

    print("="*60)

    time.sleep(3)