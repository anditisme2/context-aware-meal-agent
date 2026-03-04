# context-aware-meal-agent

## Project Overview
Ordering food may become a hassle when someone is busy or is feeling unwell. Also, it requires decision making based on dietary restrictions, preferences and such. That's where a smart agent that automates the task of food ordering comes into play.\
This project implements a context-aware AI agent that autonomously recommends meals by:\
•Understanding user preferences and dietary constraints\
•Interpreting contextual signals (time, weather, activity, cravings)\
•Applying rule-based decision logic\
•Generating explainable meal recommendations\
The goal is to study and implement the core components of an intelligent agent:\
perception, memory, decision-making, and action.

## Architecture
1.Environment\
 The environment represents everything external to the agent that influences decision-making:\
 •User profile data\
 •Dietary restrictions(e.g., vegetarian, allergies)\
 •Health goals\
 •Order history\
 •Contextual signals(time of day, weather, user input)\
 •Available restaurant and menu data\
2.Perception\
 The perception module gathers raw inputs from the environment and converts them into structured context object.\
 •Time of day\
 •Weather conditions\
 •Current craving input\
3.Memory\
 The memory module stores long-term and short-term user data, including:\
 •Food preferences\
 •Dietary restrictions\
 •Health goals\
 •Order history\
 •Feedback\
4.Decision Engine\
 The decision engine is responsible for selecting the optimal meal recommendation through a multi-step process.\
 The system initially uses rule-based logic to maintain interpretability and clarity before introducing machine learning enhancements.\
5.Action Layer\
 The action layer executes the agent's final decision by:\
 •Returning top-ranked meal recommendations\
 •Optionally automating ordering.
