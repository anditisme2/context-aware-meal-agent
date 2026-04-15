from fastapi import APIRouter
import json, os
from agent.perception.context import build_context
from agent.memory.user_memory import get_user_profile

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
