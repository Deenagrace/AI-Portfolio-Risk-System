# generate random stock prices every 5 seconds for stock symbols AAPL TSLA GOOG META AMZN
import asyncio
import random
import time

stock_symbols = ["AAPL", "TSLA", "GOOG", "META", "AMZN"]

async def generate_stock_prices():
    while True:
        for symbol in stock_symbols:
            price = round(random.uniform(100, 500), 2)
            print(f"{symbol}: ${price}")
        await asyncio.sleep(5)
if __name__ == "__main__":
    asyncio.run(generate_stock_prices())
    