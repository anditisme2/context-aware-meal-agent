from fastapi import APIRouter
import json, os

router = APIRouter()

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