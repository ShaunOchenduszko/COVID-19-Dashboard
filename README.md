# COVID 19 Visualization

## Background
Full-stack Interactive Dashboard Analyzing US COVID 19 Data Exploring Cases, Deaths, Vaccinations, and Unemployment. Utilizing Jupyter Notebook, Python, Flask, SQLAlchemy, PostgreSQL, Leaflet.js, Plotly.js, and HTML/CSS.
 
## Objective

### Step 1 - Extract, Transform, Load
 - Data was first extracted from cdc.gov
 - CSV files were then loaded into the PostgreSQL database
 - Session was created to the database using SQLAlchemy
 - Data was then transformed and filtered utilizing SQLAlchemy ORM tools to construct our datasets for our graphs

### Step 2 - Visualizations
Use Plotly.js and Leaflet.js to build interactive charts for the dashboard

 - Create a Date Drop-Down using data from the date route

 - Map with Markers using data from the date route 
     - Using Cases, Deaths, Case Per 100, Death Per 100, Vaccination Percentage, Unemployment, and Population

 - Create a State Drop-Down using data from the state route

 - Create a Line Graph of Cases over Time


 - Create a Line Graph of Deaths Per 100 over Time


 - Create a Bar Graph of Vaccination Percentage


 - Create a Bar Graph of Unemployment Percentage


 - Create a Pie Chart of Each Vaccine Brand
 
 ### Step 3 - Flask
 Deploy flask app to local server
 - Use the provided Postgres file for the database

### Step 4 - Flask API
Using Flask API code to serve the data needed for the plots
- Routes must be tested by visiting each in the browser
