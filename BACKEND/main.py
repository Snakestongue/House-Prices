import joblib
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.linear_model import Lasso, Ridge, LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.preprocessing import StandardScaler, MinMaxScaler, PowerTransformer, QuantileTransformer, RobustScaler
df = pd.read_csv("BACKEND/boston.csv")

#print(df.isnull().sum())

"""FEATURES"""
X =df[[
    "CRIM",
    "ZN",
    "INDUS",
    "CHAS",
    "NOX",
    "RM",
    "AGE",
    "DIS",
    "RAD",
    "TAX",
    "PTRATIO",
    "B",
    "LSTAT"
]]

"""TARGET"""
Y = df["MEDV"]

"""SPLITS"""
xTrain, xTest, yTrain, yTest = train_test_split(
    X, Y, test_size=.3, random_state=11
)

"""Replaced with Cross Validation"""
# xVal, xTest, yVal, yTest = train_test_split(
#     xTemp, yTemp, test_size=.5, random_state=11
# )

"""DICTIONARIES"""
models = {
    "Linear": LinearRegression(),
    "Ridge": Ridge(alpha=1),
    "Lasso": Lasso(alpha=.1),
}
scales = {
    "Standard": StandardScaler(),
    "Minmax": MinMaxScaler(),
    "Robust": RobustScaler(),
    "Quant": QuantileTransformer(),
    "Power": PowerTransformer()
}
info = []
best_model = None
best_score = -100000
for name, scaler in scales.items():
    for model_name, model in models.items():
        pipeline = Pipeline([
            ("Scaler", scaler),
            ("Model", model)
        ])
        crossValResults = cross_val_score(
             pipeline, xTrain, yTrain, cv=5, scoring="r2"
        )
        averageR2 = crossValResults.mean()
        info.append({
            "Scaler": name,
            "Model": model_name,
            "R2": averageR2
        })
        if averageR2 > best_score:
            best_score = averageR2
            best_model = pipeline
            
        """REPLACED WITH CROSS VALIDATION (above)"""
        # pipeline.fit(xTrain, yTrain)
        # predict = pipeline.predict(xVal)
        # info.append({
        #     "Scaler": name, 
        #     "Model": model_name, 
        #     "R2": r2_score(yVal, predict), 
        #     "MAE": mean_absolute_error(yVal, predict), 
        #     "MSE": mean_squared_error(yVal, predict),
        #     "RMSE": mean_squared_error(yVal, predict) **.5
        # })
        # if (r2_score(yVal, predict)>best_score):
        #     best_score = r2_score(yVal, predict)
        #     best_model = pipeline

trees = {
    "Forest": RandomForestRegressor(
        n_estimators=100,
        max_depth=3,
        random_state=11,
    ),
    "Gradient": GradientBoostingRegressor(
        n_estimators=100,
        max_depth=2,
        random_state=11,
        learning_rate=.1
    )
}
for model_name, model in trees.items():
    crossValTrees =cross_val_score(
        model,xTrain, yTrain,cv=5, scoring="r2"
    )
    averageR2 = crossValTrees.mean()
    info.append({
        "Scaler": "None",
        "Model": model_name,
        "R2": averageR2
    })
    if averageR2 > best_score:
        best_score = averageR2
        best_model = model

    """REPLACED WITH CROSS VALIDATION (above)"""
    # model.fit(xTrain, yTrain)
    # predict = model.predict(xVal)
    # info.append({
    #     "Scaler": "None", 
    #     "Model": model_name, 
    #     "R2": r2_score(yVal, predict), 
    #     "MAE": mean_absolute_error(yVal, predict), 
    #     "MSE": mean_squared_error(yVal, predict),
    #     "RMSE": mean_squared_error(yVal, predict) **.5
    # })
    # if (r2_score(yVal, predict)>best_score):
    #         best_score = r2_score(yVal, predict)
    #         best_model = model
result = pd.DataFrame(info)
result = result.sort_values(["R2"], ascending=False)
print(result.head(10))

"""FINAL MODEL"""
# xFinal = pd.concat([xTrain, xVal])
# yFinal = pd.concat([yTrain, yVal])
best_model.fit(
    xTrain,
    yTrain
)
final_predict = best_model.predict(xTest)
print("Best Model:", best_model)
print("Best R2:", best_score)

print("Test R2:", r2_score(yTest, final_predict))
print("Test MSE:", mean_squared_error(yTest, final_predict))
print("Test RMSE:", mean_squared_error(yTest, final_predict) ** .5)
print("Test MAE:", mean_absolute_error(yTest, final_predict))

"""BAR GRAPH - Model (X) & R2(Y)"""
# plotX = result["Model"] + "--" + result["Scaler"]
# plt.bar(plotX, result["R2"])
# plt.xlabel("Model")
# plt.ylabel("R2") # yaxis name
# plt.title("Model and R2") #title of graph
# plt.show()

"""SCATTER"""
plt.scatter(yTest, final_predict)
plt.xlabel("Actual Value")
plt.ylabel("Predicted Value") # yaxis name
plt.title("Actual Values vs Predictions") #title of graph
plt.plot(
    [yTest.min(), yTest.max()],
    [yTest.min(), yTest.max()],
    color="red"
)
plt.show()

joblib.dump(best_model, "housing_model.pkl")
print("Model saved!")