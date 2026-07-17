from flask import Flask, render_template, request
import joblib
import pandas as pd
app = Flask(
    __name__, #main app file
    template_folder="../FRONTEND",#where html is
    static_folder="../FRONTEND"#where css, js, imgs are
)
model = joblib.load("housing_model.pkl") 
#joblib stores the BEST model from main.py so retraining is NOT required every time
@app.route("/")#homepage
def home():
    return render_template("index.html")#loads html
@app.route("/predict", methods =["POST"] )
#another url (/predict) where i click button and it posts the info i filled in form to /predict
def predict():
    values={
        "CRIM": float(request.form["CRIM"]), #request.form is getting data from HTML
        "ZN": float(request.form["ZN"]),
        "INDUS": float(request.form["INDUS"]),
        "CHAS": float(request.form["CHAS"]),
        "NOX": float(request.form["NOX"]),
        "RM": float(request.form["RM"]),
        "AGE": float(request.form["AGE"]),
        "DIS": float(request.form["DIS"]),
        "RAD": float(request.form["RAD"]),
        "TAX": float(request.form["TAX"]),
        "PTRATIO": float(request.form["PTRATIO"]),
        "B": float(request.form["B"]),
        "LSTAT": float(request.form["LSTAT"])
    }
    df = pd.DataFrame([values]) #makes the ditionary into a panda dataframe
    prediction = model.predict(df)[0]#sends data to my model
    price = prediction * 1000
    return render_template(
        "final.html",
        price=f"{price:.2f}"
    )
if __name__ == "__main__":
    app.run(debug=True) #server starts