CREATE TABLE covid_case_death (
id SERIAL PRIMARY KEY,
submission_date DATE,
state VARCHAR (5),
tot_cases INT,
new_case INT,
tot_death INT,
new_death INT
);

CREATE TABLE covid_vac (
id SERIAL PRIMARY KEY,
submission_date DATE,
state VARCHAR (5),
distributed INT,
distributed_janssen INT,
distributed_moderna INT,
distributed_pfizer INT,
dist_per_100K INT,
administered INT,
administered_janssen INT,
administered_moderna INT,
administered_pfizer INT,
recip_administered INT,
administered_dose1_recip INT,
administered_dose1_pop_pct FLOAT,
series_complete_yes INT,
series_complete_pop_pct FLOAT
);

CREATE TABLE us_unemployment (
id SERIAL PRIMARY KEY,
submission_date DATE,
state VARCHAR (5),
unemployment_rate FLOAT
);

CREATE TABLE state_population (
id SERIAL PRIMARY KEY,
state VARCHAR (5),
population FLOAT
);