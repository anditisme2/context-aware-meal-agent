from datetime import datetime

def build_context(time_of_day=None, weather=None, craving=None):
    now = datetime.now()
    hour = now.hour
    weather = weather or "any"
    if not time_of_day:
        if 5<= hour < 9:
            time_of_day = 'breakfast'
        elif 9 <= hour < 11:
            time_of_day = 'brunch'
        elif 11 <= hour < 15:
            time_of_day = 'lunch'
        elif 15 <= hour < 18:
            time_of_day = 'snack'
        elif 18 <= hour < 22:
            time_of_day = 'dinner'
        else:
            time_of_day = 'none'
    if craving:
        craving = craving.lower().strip()
    return {
        "time_of_day": time_of_day,
        "weather": weather,
        "craving": craving
    }