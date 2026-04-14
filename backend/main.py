from fastapi import FastAPI
from api.routes import router

app = FastAPI(title="Smart Food Agent API")
app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to the Smart Food Agent API!"}