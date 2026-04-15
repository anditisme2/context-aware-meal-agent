import json, os

def get_user_profile(user_id):
    path = os.path.join(os.path.dirname(__file__), "../../data/users.json")
    with open(path) as f:
        users=json.load(f)
    for user in users:
        if user["id"]==user_id:
            return user
    return None