# 🍽️ Context-Aware Meal Agent

Ordering food can be a hassle when someone is busy or feeling unwell — and it requires decision-making based on dietary restrictions, preferences, and context. This project implements a context-aware AI agent that automates meal recommendations by:

- Understanding user preferences and dietary constraints
- Interpreting contextual signals (time of day, weather, activity, cravings)
- Applying rule-based decision logic
- Generating explainable meal recommendations

The goal is to study and implement the core components of an intelligent agent: **perception, memory, decision-making, and action**.

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Backend     | Python, FastAPI, Uvicorn                        |
| Frontend    | React (Vite)                                    |
| Data        | JSON (upgradeable to SQLite/PostgreSQL)         |
| Agent Logic | Rule-based scoring (upgradeable to ML)          |

---

## Architecture

The agent is composed of five components that mirror the structure of an intelligent agent:

### 1. Environment
Everything external to the agent that influences decision-making:
- User profile data (dietary restrictions, health goals, preferences)
- Order history and feedback
- Contextual signals (time of day, weather, user input)
- Available restaurant and menu data

### 2. Perception
Gathers raw inputs from the environment and converts them into a structured context object:
- Time of day (auto-detected or user-provided)
- Weather conditions
- Current craving input

### 3. Memory
Stores long-term and short-term user data:
- Food preferences and dietary restrictions
- Health goals
- Order history
- Feedback and ratings

### 4. Decision Engine
Selects the optimal meal recommendation through a multi-step process. The system uses rule-based logic to maintain interpretability, with ML enhancements planned for a later phase.

### 5. Action Layer
Executes the agent's final decision by:
- Returning top-ranked meal recommendations with explainable reasons
- Optionally automating ordering (future phase)

---

## Project Structure

```
context-aware-meal-agent/
├── backend/
│   ├── main.py                   # FastAPI app entry point
│   ├── requirements.txt
│   ├── data/
│   │   ├── restaurants.json      # Restaurant catalog
│   │   ├── menu_items.json       # Menu with tags, macros, suitability
│   │   └── users.json            # User profiles (memory store)
│   ├── api/
│   │   └── routes.py             # REST API endpoints
│   └── agent/
│       ├── perception/
│       │   └── context.py        # Builds context from time, weather, craving
│       ├── memory/
│       │   └── user_memory.py    # Load/update user profiles
│       ├── decision/
│       │   └── engine.py         # Rule-based scoring & ranking engine
│       └── action/               # (next phase: order automation)
└── frontend/
    └── src/
        ├── components/           # Reusable UI components
        ├── pages/                # App pages
        ├── hooks/                # Custom React hooks
        └── utils/                # Helpers
```

### Agent Components Summary

| Component  | File                           | Responsibility                                                       |
|------------|--------------------------------|----------------------------------------------------------------------|
| Perception | `agent/perception/context.py`  | Converts raw inputs (time, weather, craving) into structured context |
| Memory     | `agent/memory/user_memory.py`  | Stores and retrieves user preferences, history, and feedback         |
| Decision   | `agent/decision/engine.py`     | Rule-based scoring: filters and ranks meals                          |
| Action     | `agent/action/`                | Returns recommendations; future: triggers ordering                   |

---

## Setup & Running

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

- API runs at: `http://localhost:8000`
- Interactive docs at: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm start
```

- Frontend runs at: `http://localhost:3000`

---

## API Reference

### `POST /api/recommend`
Returns top meal recommendations for a user based on their profile and current context.

**Request body:**
```json
{
  "user_id": "u1",
  "craving": "spicy",
  "weather": "cold",
  "time_of_day": "dinner"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "meal": { "name": "Spicy Ramen", "calories": 680 },
      "restaurant": { "name": "Noodle Street", "rating": 4.6 },
      "score": 88.0,
      "reasons": [
        "Great for dinner",
        "Fits cold weather",
        "Matches your craving for spicy"
      ]
    }
  ],
  "context": {
    "time_of_day": "dinner",
    "weather": "cold",
    "craving": "spicy"
  }
}
```

### `GET /api/users`
Returns all user profiles.

### `GET /api/menu`
Returns all menu items.

---

## How the Decision Engine Works

Each meal starts with a base score of 50 and is adjusted by the following rules:

| Rule                   | Effect   | Logic                                               |
|------------------------|----------|-----------------------------------------------------|
| Health goal alignment  | +20      | Meal is tagged as suitable for the user's goal      |
| Meal time match        | +10      | Meal is appropriate for the current time of day     |
| Weather fit            | +10      | Meal is tagged for the current weather              |
| Preference match       | +8 each  | Meal tags overlap with user's stated preferences    |
| Dislike penalty        | −25      | Meal tags overlap with user's dislikes              |
| Craving match          | +20      | Craving keyword found in meal tags or name          |
| Positive past feedback | +10      | User rated this meal 4 or 5 stars before            |
| Negative past feedback | −15      | User rated this meal 2 stars or below               |
| Hard filters           | excluded | Dietary restrictions and allergies remove meals before scoring |

Meals are ranked by final score and the top 3 are returned with their reasons — making every recommendation fully explainable.

---

## Roadmap

- [ ] Build React frontend (user selector, context form, recommendation cards)
- [ ] Add feedback endpoint (`POST /api/feedback`) to close the learning loop
- [ ] Integrate real weather API (OpenWeatherMap) for automatic weather detection
- [ ] Migrate data layer from JSON to SQLite or PostgreSQL
- [ ] Upgrade decision engine with ML scoring (collaborative filtering)
- [ ] Implement order automation in the Action layer
