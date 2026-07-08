# AI Housing Predictor

A **Machine Learning + Flask Web Application** that predicts Boston housing prices using multiple regression models. The project combines a trained Scikit-Learn model, a Flask backend API, and an interactive frontend with a Three.js animated 3D background.

The application allows users to enter housing information and receive an AI-generated price prediction instantly.

## Features

### Machine Learning

Trains and compares multiple regression algorithms:

  - Linear Regression
  - Ridge Regression
  - Lasso Regression
  - Random Forest Regressor
  - Gradient Boosting Regressor
    
Tests multiple feature scaling techniques:

  - Standard Scaling
  - Min-Max Scaling
  - Robust Scaling
  - Quantile Transformation
  - Power Transformation
    
Automatically selects the best-performing validation model

Retrains the final model using training + validation data

Saves the trained model using Joblib

### Web Application

- Flask-powered backend
- HTML form input system
- Loads saved model without retraining via Joblit
- Clean separation between:

  - Frontend
  - Backend
  - Machine Learning pipeline

### Interactive Frontend

- Responsive UI using Tailwind CSS
- Animated 3D background using Three.js
- Floating buildings and particle effects
- Mouse-controlled camera movement

# Project Structure

```
AI-Housing-Predictor/
│
├── BACKEND/
│   ├── app.py                  # Flask application
│   ├── boston.csv              # CSV used to train model
│   ├── housing_model.pkl       # Saved trained ML model
│   └── main.py                 # Model training script
│
├── FRONTEND/
│   ├── index.html              # User interface
│   ├── input.css               # Styling
│   └── threeD.js               # Three.js animations
│
└── README.md
```

# 🧩 Technologies Used

## Backend

- Python
- Flask
- Pandas
- Joblib

## Machine Learning

- Scikit-Learn
- Matplotlib
- Pandas
- Linear Regression
- Ridge Regression
- Lasso Regression
- Random Forest
- Gradient Boosting

## Frontend

* HTML
* Tailwind CSS
* JavaScript
* Three.js

# Three.js Background

The frontend contains a  3D environment:

### Particle System

- 6000 animated particles
- Continuous rotation

### Buildings

- Randomly generated 3D structures
- Wireframe futuristic design

### Effects

- Bloom lighting
- Ambient lighting
- Mouse-controlled camera movement

# Project Goal

To demonstrate a complete machine learning workflow:

**Data → Training → Evaluation → Deployment → User Interaction**

