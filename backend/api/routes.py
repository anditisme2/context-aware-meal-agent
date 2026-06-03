from fastapi import APIRouter
import json, os
from agent.perception.context import build_context
from agent.memory.user_memory import get_user_profile
from agent.decision.engine import recommend_meals

router = APIRouter()


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