#The engine loads all menu items and filters out the ones user can't eat based on their profile and context. It then ranks the remaining meals and picks the best three to recommend.
import json, os
from agent.memory.user_memory import get_user_profile

def filter_meals(meals, user):
    allowed=[]
    for meal in meals:
        skip=False
        for allergy in user["allergies"]:
            if allergy in meal["tags"]:
                skip=True
                break
        if not skip:
            for diet in user["dietary_restrictions"]:
                if diet not in meal["tags"]:
                    skip=True
                    break
        if not skip:
            allowed.append(meal)
    return allowed

def score_meal(meal, user, context):
    score=0
    reasons=[]
    if context["time_of_day"] in meal["meal_time"]:
        score+=10
        reasons.append("Right time of day for this meal.")
    if context["weather"] in meal["weather_fit"] or "any" in meal["weather_fit"]:
        score+=10
        reasons.append("Right weather for this meal.")
    for user_pref in user["preferences"]:
        if user_pref in meal["tags"]:
            score+=8
            reasons.append(f"Matches your preference for {user_pref}.")
    if context["craving"]:
        if context["craving"] in meal["tags"] or context["craving"] in meal["name"].lower():
            score+=20
            reasons.append(f"It matches your craving for {context['craving']}.")
    if user["health_goal"] in meal["suitable_for"]:
        score+=20
        reasons.append("Suits your health goal.")
    if user["feedback"]:
        if meal["id"] in user["feedback"]:
            rating=user["feedback"][meal["id"]]
            if rating>=4:
                score+=10
            if rating<=2:
                score-=15
            reasons.append(f"You rated this meal {rating} stars")
    return score, reasons

def recommend_meals(user, context):
    path=os.path.join(os.path.dirname(__file__), "../../data/menu_items.json")
    with open(path) as f:
        meals=json.load(f)
    allowed_meals=filter_meals(meals, user)
    scored=[]
    for meal in allowed_meals:
        score, reasons = score_meal(meal, user, context)
        scored.append({"meal": meal, "score": score, "reasons": reasons})
    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:3]