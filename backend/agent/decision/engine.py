import json
import os
from typing import List

MENU_PATH = os.path.join(os.path.dirname(__file__), "../../data/menu_items.json")
RESTAURANT_PATH = os.path.join(os.path.dirname(__file__), "../../data/restaurants.json")


def load_data():
    with open(MENU_PATH) as f:
        menu = json.load(f)
    with open(RESTAURANT_PATH) as f:
        restaurants = {r["id"]: r for r in json.load(f)}
    return menu, restaurants


def score_meal(meal: dict, user: dict, context: dict) -> tuple[float, list[str]]:
    """
    Rule-based scoring engine. Returns (score, reasons).
    Each rule adds or subtracts from the score and logs an explanation.
    """
    score = 50.0
    reasons = []

    # --- Rule 1: Dietary restriction hard filter ---
    for restriction in user.get("dietary_restrictions", []):
        if restriction not in meal.get("tags", []):
            # Only penalize if the restriction is a relevant tag category
            pass  # hard filter handled before scoring

    # --- Rule 2: Allergy filter (hard exclusion, handled before) ---

    # --- Rule 3: Health goal alignment ---
    goal = user.get("health_goal", "general")
    if goal in meal.get("suitable_for", []):
        score += 20
        reasons.append(f"Supports your {goal} goal")

    # --- Rule 4: Meal time match ---
    if context["time_of_day"] in meal.get("meal_time", []):
        score += 10
        reasons.append(f"Great for {context['time_of_day']}")

    # --- Rule 5: Weather match ---
    weather = context.get("weather", "any")
    if weather in meal.get("weather_fit", []) or "any" in meal.get("weather_fit", []):
        score += 10
        reasons.append(f"Fits {weather} weather")

    # --- Rule 6: Preference match ---
    pref_matches = [p for p in user.get("preferences", []) if p in meal.get("tags", [])]
    if pref_matches:
        score += len(pref_matches) * 8
        reasons.append(f"Matches your preferences: {', '.join(pref_matches)}")

    # --- Rule 7: Dislike penalty ---
    dislike_matches = [d for d in user.get("dislikes", []) if d in meal.get("tags", [])]
    if dislike_matches:
        score -= 25
        reasons.append(f"Contains things you dislike: {', '.join(dislike_matches)}")

    # --- Rule 8: Craving match ---
    craving = context.get("craving")
    if craving:
        if any(craving in tag for tag in meal.get("tags", [])) or craving in meal["name"].lower():
            score += 20
            reasons.append(f"Matches your craving for {craving}")

    # --- Rule 9: Past positive feedback ---
    feedback = user.get("feedback", {})
    if meal["id"] in feedback:
        rating = feedback[meal["id"]]
        if rating >= 4:
            score += 10
            reasons.append("You've enjoyed this before")
        elif rating <= 2:
            score -= 15
            reasons.append("You rated this low before")

    return round(score, 1), reasons


def recommend_meals(user: dict, context: dict, top_n: int = 3) -> List[dict]:
    """
    Main decision pipeline: filter → score → rank → return top N.
    """
    menu, restaurants = load_data()

    results = []
    for meal in menu:
        # Hard filter: dietary restrictions
        restricted = False
        for restriction in user.get("dietary_restrictions", []):
            if restriction not in meal.get("tags", []) and restriction != "none":
                # Only filter if restriction is meaningful (e.g., vegan excludes non-vegan)
                DIET_EXCLUSIONS = {
                    "vegan": ["non-vegan", "meat", "chicken", "pork", "fish"],
                    "vegetarian": ["meat", "chicken", "pork", "fish"],
                    "gluten-free": ["gluten"],
                    "keto": ["high-carb"],
                }
                excluded_tags = DIET_EXCLUSIONS.get(restriction, [])
                if any(tag in meal.get("tags", []) for tag in excluded_tags):
                    restricted = True
                    break

        # Hard filter: allergies
        for allergy in user.get("allergies", []):
            if allergy in meal.get("tags", []):
                restricted = True
                break

        if restricted:
            continue

        score, reasons = score_meal(meal, user, context)
        restaurant = restaurants.get(meal["restaurant_id"], {})

        results.append({
            "meal": meal,
            "restaurant": restaurant,
            "score": score,
            "reasons": reasons,
        })

    # Rank by score
    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:top_n]
