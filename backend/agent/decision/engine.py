#The engine loads all menu items and filters out the ones user can't eat based on their profile and context. It then ranks the remaining meals and picks the best three to recommend.
import json, os
from memory.user_memory import get_user_profile

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
        reasons.append("It's the right time of day for this meal.")
    if context["weather"] in meal["weather_fit"] or "any" in meal["weather_fit"]:
        score+=10
        reasons.append("It's the right weather for this meal.")
    for user_pref in user["preferences"]:
        if user_pref in meal["tags"]:
            score+=8
            reasons.append(f"It matches your preference for {user_pref}.")
    return score, reasons

def recommend_meals(user, context):
    path=os.path.join(os.path.dirname(__file__), "../../data/menu_items.json")
    with open(path) as f:
        meals=json.load(f)
    allowed_meals=filter_meals(meals, user)
    score_meals_list=[]
    score_reasons_dict={}
    for meal in allowed_meals:
        score, reasons=score_meal(meal, user, context)
        score_meals_list.append((meal, score))
        score_reasons_dict[meal["name"]]=reasons
    top_meals=sorted(score_meals_list, key=lambda x: x[1], reverse=True)[:3]
    recommendations=[]
    for meal, score in top_meals:
        recommendations.append({
            "meal": meal,
            "score": score,
            "reasons": score_reasons_dict[meal["name"]]
        })
    return recommendations