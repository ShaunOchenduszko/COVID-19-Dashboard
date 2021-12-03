from flask import Flask,render_template, jsonify, request
from sqlalchemy import create_engine
from config import post_pass
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.sql.expression import and_

# create and modify the flask app
app = Flask(__name__)

# engine and connect to sql DB
connection_string = f"postgres:{post_pass}@localhost:5432/Project2"
engine = create_engine(f'postgresql://{connection_string}')

Base = automap_base()
Base.prepare(engine, reflect=True)

# save referances to table 
#set table variable
covid_case_death = Base.classes.covid_case_death
covid_vac = Base.classes.covid_vac
us_unemployment = Base.classes.us_unemployment
state_population = Base.classes.state_population

# opening standard route
@app.route('/')
def home():
    with open ('templates/index.html') as f:
        return f.read()

@app.route('/cov1/<date>')
def date_func(date):
    
    # map
    session = Session(engine)
    results = session.query(covid_case_death.submission_date, covid_case_death.state, covid_case_death.tot_cases, covid_case_death.tot_death, covid_vac.series_complete_pop_pct, state_population.population, us_unemployment.unemployment_rate)\
    .outerjoin(covid_vac, covid_case_death.submission_date == covid_vac.submission_date)\
    .outerjoin(state_population, covid_case_death.state == state_population.state)\
    .outerjoin(us_unemployment, and_(covid_case_death.submission_date == us_unemployment.submission_date, covid_case_death.state == us_unemployment.state))\
    .filter(covid_case_death.submission_date == date).order_by(covid_case_death.submission_date).all()
    session.close()

    map = []
    for submission_date, state, tot_cases, tot_death, series_complete_pop_pct, population, unemployment_rate in results:
        results_dic = {}
        results_dic['submission_date'] = submission_date
        results_dic['state'] = state
        results_dic['tot_cases'] = tot_cases
        results_dic['tot_death'] = tot_death
        results_dic['cases_per_100'] = round((tot_cases / population) * 100, 2)
        results_dic['deaths_per_100'] = round((tot_death / population) * 100, 2)
        results_dic['series_complete_pop_pct'] = series_complete_pop_pct
        results_dic['population'] = population
        results_dic['unemployment_rate'] = unemployment_rate
            
        map.append(results_dic)
        
    #results
    return jsonify(map)

# routes that will be fetched with arguements end points
@app.route('/cov/<state>')
def state_func(state):

    # vis_3
    session = Session(engine)
    results = session.query(covid_case_death.submission_date, covid_case_death.state, covid_case_death.tot_cases, covid_case_death.tot_death, state_population.population).filter(covid_case_death.state == state_population.state, covid_case_death.state == state).order_by(covid_case_death.submission_date).all()
    session.close()

    #format data
    vis_3 = []
    for submission_date, state, tot_cases, tot_death, population in results:
        results_dic = {}
        results_dic['submission_date'] = submission_date
        results_dic['state'] = state
        results_dic['tot_cases'] = tot_cases
        results_dic['tot_death'] = tot_death
        
        vis_3.append(results_dic)
    
    # vis_2
    session = Session(engine)
    results = session.query(covid_case_death.submission_date, covid_case_death.state, covid_case_death.tot_cases, covid_case_death.tot_death).filter(covid_case_death.state == state_population.state, covid_case_death.state == state).order_by(covid_case_death.submission_date).all()
    session.close()

    #format data
    vis_2 = []
    for submission_date, state, tot_cases, tot_death in results:
        results_dic = {}
        results_dic['submission_date'] = submission_date
        results_dic['state'] = state
        results_dic['cases_per_100'] = round((tot_cases / population) * 100, 2)
        results_dic['deaths_per_100'] = round((tot_death / population) * 100, 2)
        
        vis_2.append(results_dic)

    #vis 4
    session = Session(engine)
    results = session.query(covid_vac.submission_date, covid_vac.state, covid_vac.series_complete_pop_pct).filter(covid_vac.state == state).order_by(covid_vac.submission_date).all()
    session.close()

    #format data
    vis_4 = []
    for submission_date, state, series_complete_pop_pct in results:
        results_dic = {}
        results_dic['submission_date'] = submission_date
        results_dic['state'] = state
        results_dic['series_complete_pop_pct'] = series_complete_pop_pct
        vis_4.append(results_dic)
        

    #Vis 5
    session = Session(engine)
    results = session.query(us_unemployment.submission_date, us_unemployment.state, us_unemployment.unemployment_rate).filter(us_unemployment.state == state).order_by(us_unemployment.submission_date).all()
    session.close()

    #format data
    vis_5 = []
    for submission_date, state, unemployment_rate in results:
        results_dic = {}
        results_dic['submission_date'] = submission_date
        results_dic['state'] = state
        results_dic['unemployment_rate'] = unemployment_rate
        vis_5.append(results_dic)
    
    #vis 6
    session = Session(engine)
    results = session.query(covid_vac.submission_date, covid_vac.state, covid_vac.series_complete_janssen, covid_vac.series_complete_moderna, covid_vac.series_complete_pfizer).filter(covid_vac.state == state, covid_vac.submission_date == "2021, 10, 1").order_by(covid_vac.submission_date).all()
    session.close()

    #format data
    vis_6 = []
    for submission_date, state, series_complete_janssen, series_complete_moderna, series_complete_pfizer in results:
        results_dic = {}
        total = series_complete_janssen + series_complete_moderna + series_complete_pfizer
        results_dic['submission_date'] = submission_date
        results_dic['state'] = state
        results_dic['series_complete_janssen'] = round((series_complete_janssen/total) * 100, 2)
        results_dic['series_complete_moderna'] = round((series_complete_moderna/total) * 100, 2)
        results_dic['series_complete_pfizer'] = round((series_complete_pfizer/total) * 100, 2)
        vis_6.append(results_dic)

    #results
    return jsonify(vis_2 = vis_2,
    vis_3 = vis_3,
    vis_4 = vis_4,
    vis_5 = vis_5,
    vis_6 = vis_6)

# extra ending thingy that I still dont understand 
if __name__ == '__main__':
    app.run(debug=True)
    

