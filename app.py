import datetime as dt
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, request, render_template
from sqlalchemy.sql.expression import and_, false, true
from config import post_pass

#################################################
# Database Setup
#################################################
connection_string = f"postgres:{post_pass}@localhost:5432/Project2"
engine = create_engine(f'postgresql://{connection_string}') 

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
covid_Vac = Base.classes.covid_vac


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route('/')
def hello():

    data = {'username': 'Pang', 'site': 'stackoverflow.com'}
    return render_template('test.html', data=data)


@app.route("/<state>", methods=["GET", "POST"])
def test_page():

    print("Request received for 'Home' page....")
    if request.method == "POST":
        print(request.get_json())

        session = Session(engine)

        state = request.form['nm']

        resutl = session.query(covid_Vac.state, func.count(covid_Vac.state)).\
            group_by(covid_Vac.state).\
            order_by(func.count(covid_Vac.state).desc()).filter(covid_Vac.state == state).all()
        
        session.close()

        result_list = []

        for state, count in resutl:
            result_dict = {}
            result_dict['state'] = state
            result_dict['count'] = count
            result_list.append(result_dict)
        
        return jsonify(result_list)
    else:
        message = {"greeting": "Hello from Flask!"}
        return jsonify(message)



if __name__ == "__main__":
    # @TODO: Create your app.run statement here
    app.run(debug=True)