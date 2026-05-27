from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from portfolio_data import clients

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/clients")
def get_clients():
    return clients