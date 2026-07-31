# AI Housing Predictor

A **Machine Learning + Flask Web Application** that predicts Boston housing prices using multiple regression models. The project combines a trained Scikit-Learn model, a Flask backend API, and an interactive frontend with a Three.js animated 3D background.

The application allows users to enter housing information and receive an AI-generated price prediction instantly.

## Live Demo

https://ai-house-prices.onrender.com/

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

Retrains the final model using all the training data

Saves the trained model using Joblib

[View Full Machine Learning Documentation](https://github.com/Snakestongue/House-Prices/blob/Kaggle-Data/README.md)

This link contains a detailed version of ML workflow and is located in the other branch.

### Web Application

- Flask-powered backend
- HTML form input system
- Loads saved model without retraining via Joblib
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
│   ├── final.html              # Results page                     
│   ├── index.html              # Main page
│   ├── input.css               # Styling
│   ├── threeD.js               # Three.js animations for home page
│   └── threeDFinal.js          # Three.js animations for result page 
│
└── README.md
```

# Technologies Used

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

# Machine Learning


## Dataset

The dataset includes these features: These descriptions were found on GeeksforGeeks

- **CRIM** - Per capita crime rate
- **ZN** - Proportion of residential land zoned for large lots
- **INDUS** - Proportion of non-retail business acres
- **CHAS** - Charles River variable (1/0)
- **NOX** - Nitric oxide concentration
- **RM** - Average number of rooms (prior to 1940)
- **AGE** - Proportion of older homes
- **DIS** - Distance to employment centers
- **RAD** - Accessibility to highways
- **TAX** - Property tax rate
- **PTRATIO** - Pupil-teacher ratio
- **B** - Proportion Black residents *This feature is highly controversial and is only used for educational and learning purposes*
- **LSTAT** - Percentage of lower-status population

The model predicts:

- **MEDV** - Median housing value
## Dataset Note

Please be aware that the Boston Housing dataset is used strictly for **educational purposes**.
The dataset contains historical features which should not be used in the modern world



## Models Tested

The project compares several models:

### Linear Models

* Linear Regression
* Ridge Regression
* Lasso Regression

### Tree Based Models

* Random Forest Regressor
* Gradient Boosting Regressor
* XGBRegressor

## Preprocessing

Different scaling methods were tested with linear models only:

* StandardScaler
* MinMaxScaler
* RobustScaler
* QuantileTransformer
* PowerTransformer

Tree-based models were trained without scaling.

## Workflow

The project follows this workflow:

1. Load and clean the dataset (cleaning was not required for this dataset)
2. Separate into features (`X`) and target (`Y`)
3. Split the data into (using train_test_split):

   * Training set - Used for training the models
   * *Validation set has been removed starting 07/29/2026*
   * Testing set - Used on final model for final result

4. Train linear models with different preprocessing (scalers) methods
5. Use cross_val_score with 5-fold cross validation to evaluate each linear model and preprocessing method using the average R2 score.
6. Use RandomSearchCV per each tree based model which also conducted 5-fold cross validation and found the average R2 score.
7. Evaluate models using metrics such as:
   * R2 Score
   * *The following are only used for the best model after 07/29/2026*
   * Mean Absolute Error (MAE)
   * Mean Squared Error (MSE)
   * Root Mean Squared Error (RMSE)
8. Select the best model based on R2
9. Retrain the selected model using all training data
10. Evaluate final performance on the new test data
11. Visualize predicted values compared to actual values via matplotlib

## Evaluation

### R2 Score

Measures how well the model explains the variation in housing prices. Higher values indicate better performance.

### Mean Absolute Error (MAE)

Measures the average absolute difference between predictions and the actual values.

### Mean Squared Error (MSE)

Measures the average squared difference between predictions and the actual values.

### Root Mean Squared Error (RMSE)

The square root of MSE, providing an error value.

## Results

The models were compared using their R2, and the highest performing model was selected for final testing.

Final evaluation metrics based on the test data used for only the best performing model during training:

**These metrics are prior to cross-validation** *(07/07/2026)*

* Best Model: *GradientBoostingRegressor*
* R2 Score (training): *0.8464503666168872*
* R2 Score (testing): *0.839683428489358*
* Test MSE: 14.279368991257387
* Test RMSE: 3.7788052333055466
* Test MAE: 2.5851297612340414

**These metrics are after cross-validation has been used.** *(07/29/2026)*

* Best Model: *GradientBoostingRegressor*
* R2 Score (training): *0.8449047986747675*
* R2 Score (testing): *0.8475700335309833*
* Test MSE: *13.932297851624131*
* Test RMSE: *3.732599342499022*
* Test MAE: *2.5399943435983787*

**These metrics are after GridSearchCV has been used.** *(07/29/2026)*

* Best Model: *GradientBoostingRegressor*
* R2 Score (training): *0.8455689385786902*
* R2 Score (testing): *0.8691212480085326*
* Test MSE: *11.962488724712836*
* Test RMSE: *3.458683091107486*
* Test MAE: *2.3431849798339575*

**These metrics are with XGBRegressor and RandomSearchCV** *(07/30/2026)*
* Best Model: XGBRegressor(learning_rate=0.2, max_depth=3, n_estimators=175)
* R2 Score (training): *0.85196247473132*
* R2 Score (testing): *0.8791560499812082*
* Test MSE: *11.045294729306425*
* Test RMSE: *3.323446212789734*
* Test MAE: *2.2793263937297623*


A scatter plot was created to compare actual housing prices against model predictions. Predictions closer to the diagonal reference line show a better model performance.

## Timeline *starting 07/29/2026*
 - 07/29/2026:
   -  70/30 Split
   -  Cross Validation
   -  GridSearchCV
 -  07/30/2026:
   - XGBRegressor
   - RandomSearchCV
   - 80/20 Split