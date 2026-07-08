# Boston Housing Price Prediction

## Summary

This project uses multiple machine learning regression models & scalers to predict housing prices using the Boston Housing dataset found on Kaggle. 

The target variable is **MEDV**, which represents the median value a house in thousands of dollars.

## Dataset

The dataset includes these features: These description were found on GeeksforGeeks

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
- **B** - Proportion of population by demographics
- **LSTAT** - Percentage of lower-status population

The model predicts:

- **MEDV** - Median housing value

## Models Tested

The project compares several models:

### Linear Models

* Linear Regression
* Ridge Regression
* Lasso Regression

### Tree Based Models

* Random Forest Regressor
* Gradient Boosting Regressor

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
   * Validation set - Used to select best model
   * Testing set - Used on final model for final result

4. Train linear models with different preprocessing methods
5. Evaluate models using metrics such as:

   * R² Score
   * Mean Absolute Error (MAE)
   * Mean Squared Error (MSE)
   * Root Mean Squared Error (RMSE)
6. Select the best model based on R2
7. Retrain the selected model using training & validation data
8. Evaluate final performance on the new test data
9. Visualize predicted values compared to actual values via matplotlib

## Evaluation Metrics

### R² Score

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

* R² Score: *0.839683428489358*
* MAE: *2.5851297612340414*
* MSE: *14.279368991257387*
* RMSE: *3.7788052333055466*

A scatter plot was created to compare actual housing prices against model predictions. Predictions closer to the diagonal reference line show a better model performance.

## Technologies Used

* Python
* Pandas
* Matplotlib
* Scikit-learn

