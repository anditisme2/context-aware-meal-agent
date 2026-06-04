from fastapi import APIRouter
import json, os
from agent.perception.context import build_context
from agent.memory.user_memory import get_user_profile
from agent.decision.engine import recommend_meals
import requests
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

router = APIRouter()

@router.post("/extract-intent")
def extract_intent(body: dict):
    speech_text = body["text"]
    
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""Extract the food intent from this text and return ONLY a JSON object with these fields:
                - craving: the type of food or flavor they want (e.g. spicy, sweet, comfort)
                - mood: their emotional state if mentioned (e.g. tired, happy, sick)
                - temp_preference: hot, cold, or any
                
                Text: "{speech_text}"
                
                Return only valid JSON, nothing else."""
            }
        ]
    )
    
    import json
    text = response.choices[0].message.content.strip()
    text = text.replace("```json", "").replace("```", "").strip()
    result = json.loads(text)
    return result
    
@router.get("/weather")
def get_weather(lat: float, lon: float):
    res = requests.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={
            "lat": lat,
            "lon": lon,
            "appid": WEATHER_API_KEY,
            "units": "metric"
        }
    )
    data = res.json()
    # return only what we need
    return {
        "city": data["name"],
        "temp": data["main"]["temp"],
        "condition": data["weather"][0]["main"].lower()
    }

@router.get("/users/{user_id}")
def get_user(user_id: str):
    user=get_user_profile(user_id)
    if user:
        return user
    return {"error": "User not found"}

@router.get("/menu")
def get_menu():
    path = os.path.join(os.path.dirname(__file__), '../data/menu_items.json')
    with open(path) as f:
        return json.load(f)
    
@router.get("/restaurants")
def get_restaurants():
    path=os.path.join(os.path.dirname(__file__),'../data/restaurants.json')
    with open(path) as f:
        return json.load(f)

@router.get("/users")
def get_users():
    path=os.path.join(os.path.dirname(__file__),'../data/users.json')
    with open(path) as f:
        return json.load(f)

@router.get("/context")
def get_context():
    return build_context()

@router.post("/recommend")
def get_recommendations(body: dict):
    user=get_user_profile(body["user_id"])
    context=build_context(
        time_of_day=body.get("time_of_day"),
        weather=body.get("weather"),
        craving=body.get("craving")
    )
    return recommend_meals(user, context)

@router.post("/users")
def create_user(body: dict):
    path=os.path.join(os.path.dirname(__file__),'../data/users.json')
    user={
        "id": body["id"],
        "name": body["name"],
        "allergies": body.get("allergies", []),
        "dietary_restrictions": body.get("dietary_restrictions", []),
        "preferences": body.get("preferences", []),
        "health_goal": body.get("health_goal", ""),
        "dislikes": body.get("dislikes", []),
        "order_history": [],
        "feedback": {}
    }
    with open(path) as f:
        users=json.load(f)
    if any(u["id"]==user["id"] for u in users):
        return {"error": "User with this ID already exists"}
    users.append(user)
    with open(path, "w") as f:
        json.dump(users, f, indent=2)
    return user

@router.post("/feedback")
def submit_feedback(body: dict):
    user_id=body["user_id"]
    meal_id=body["meal_id"]
    rating=body["rating"]
    path=os.path.join(os.path.dirname(__file__),'../data/users.json')
    with open(path) as f:
        users=json.load(f)
    if user_id not in [u["id"] for u in users]:
        return {"error": "User not found"}
    for user in users:
        if user["id"]==user_id:
            if meal_id not in user["order_history"]:
                user["order_history"].append(meal_id)
            user["feedback"][meal_id] = rating
            break
    with open(path, "w") as f:
        json.dump(users, f, indent=2)
    return {"message": "Feedback submitted"}