from flask import Flask,render_template, jsonify, request
from sqlalchemy import create_engine, func
import json
import os 

# engine and connect to sql DB

# save referances to table 

# create and modify the flask app
app = Flask(__name__)

# opening standard route
@app.route('/')
def home():
    with open ('templates/index.html') as f:
        return f.read()

# routes that will be fetched with arguements end points
@app.route('/cov/<state>')
def state_func(state):
    return jsonify({f"{state}":"first"})
        
@app.route('/cov1/<date>')
def date_func(date):
    # with open( f'cov/{date}') as f:
        return jsonify({f"{date}":"second"})

# extra ending thingy that I still dont understand 
if __name__ == '__main__':
    app.run(debug=True)
    

