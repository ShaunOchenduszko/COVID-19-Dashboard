SELECT * FROM covid_case_death;

SELECT * FROM covid_vac;

SELECT * FROM us_unemployment;

SELECT * FROM state_population;

SELECT * FROM covid_case_death 
WHERE (state LIKE 'CA' 
AND submission_date = '2020-12-13')
OR (state LIKE 'AL' 
AND submission_date = '2020-12-13');

SELECT * FROM us_unemployment 
WHERE (state LIKE 'CA' 
AND submission_date = '2020-04-01')
OR (state LIKE 'AL' 
AND submission_date = '2020-04-01');

SELECT * FROM us_unemployment 
WHERE submission_date = '2021-05-01'
ORDER BY unemployment_rate DESC;

--all states comparison
SELECT a.submission_date, a.state, a.unemployment_rate, b.tot_cases, b.tot_death, ((b.tot_death::FLOAT)/(b.tot_cases::FLOAT))*100::FLOAT case_death_percentage
FROM us_unemployment a 
LEFT JOIN covid_case_death b
ON a.state = b.state
WHERE (a.submission_date = '2021-01-01' AND b.submission_date = '2021-01-01')
OR (a.submission_date = '2021-02-01' AND b.submission_date = '2021-02-01')
OR (a.submission_date = '2021-03-01' AND b.submission_date = '2021-03-01')
OR (a.submission_date = '2021-04-01' AND b.submission_date = '2021-04-01')
OR (a.submission_date = '2021-05-01' AND b.submission_date = '2021-05-01')
OR (a.submission_date = '2021-06-01' AND b.submission_date = '2021-06-01')
OR (a.submission_date = '2021-07-01' AND b.submission_date = '2021-07-01')
OR (a.submission_date = '2021-08-01' AND b.submission_date = '2021-08-01')
OR (a.submission_date = '2021-09-01' AND b.submission_date = '2021-09-01')
GROUP BY a.state, a.id, b.id
ORDER BY a.submission_date ASC, a.unemployment_rate DESC;

--CA cases and unemploment
SELECT a.submission_date, a.state, a.unemployment_rate, b.tot_cases, b.tot_death, ((b.tot_death::FLOAT)/(b.tot_cases::FLOAT))*100::FLOAT case_death_percentage, c.series_complete_pop_pct
FROM us_unemployment a 
LEFT JOIN covid_case_death b
ON a.state = b.state
LEFT JOIN covid_vac c
ON a.state = c.state
WHERE (a.state = 'CA' AND b.state = 'CA') 
AND ((a.submission_date = '2021-01-01' AND b.submission_date = '2021-01-01' AND c.submission_date = '2021-01-01')
OR (a.submission_date = '2021-02-01' AND b.submission_date = '2021-02-01' AND c.submission_date = '2021-02-01')
OR (a.submission_date = '2021-03-01' AND b.submission_date = '2021-03-01' AND c.submission_date = '2021-03-01')
OR (a.submission_date = '2021-04-01' AND b.submission_date = '2021-04-01' AND c.submission_date = '2021-04-01')
OR (a.submission_date = '2021-05-01' AND b.submission_date = '2021-05-01' AND c.submission_date = '2021-05-01')
OR (a.submission_date = '2021-06-01' AND b.submission_date = '2021-06-01' AND c.submission_date = '2021-06-01')
OR (a.submission_date = '2021-07-01' AND b.submission_date = '2021-07-01' AND c.submission_date = '2021-07-01')
OR (a.submission_date = '2021-08-01' AND b.submission_date = '2021-08-01' AND c.submission_date = '2021-08-01')
OR (a.submission_date = '2021-09-01' AND b.submission_date = '2021-09-01' AND c.submission_date = '2021-09-01'))
GROUP BY a.state, a.id, b.id, c.series_complete_pop_pct
ORDER BY a.submission_date ASC, a.unemployment_rate DESC;

--VT cases and unemploment
SELECT a.submission_date, a.state, a.unemployment_rate, b.tot_cases, b.tot_death, ((b.tot_death::FLOAT)/(b.tot_cases::FLOAT))*100::FLOAT case_death_percentage, c.series_complete_pop_pct, d.population
FROM us_unemployment a 
LEFT JOIN covid_case_death b
ON a.state = b.state
LEFT JOIN covid_vac c
ON a.state = c.state
LEFT JOIN state_population d
ON a.state = d.state
WHERE (a.state = 'VT' AND b.state = 'VT') 
AND ((a.submission_date = '2021-01-01' AND b.submission_date = '2021-01-01' AND c.submission_date = '2021-01-01')
OR (a.submission_date = '2021-02-01' AND b.submission_date = '2021-02-01' AND c.submission_date = '2021-02-01')
OR (a.submission_date = '2021-03-01' AND b.submission_date = '2021-03-01' AND c.submission_date = '2021-03-01')
OR (a.submission_date = '2021-04-01' AND b.submission_date = '2021-04-01' AND c.submission_date = '2021-04-01')
OR (a.submission_date = '2021-05-01' AND b.submission_date = '2021-05-01' AND c.submission_date = '2021-05-01')
OR (a.submission_date = '2021-06-01' AND b.submission_date = '2021-06-01' AND c.submission_date = '2021-06-01')
OR (a.submission_date = '2021-07-01' AND b.submission_date = '2021-07-01' AND c.submission_date = '2021-07-01')
OR (a.submission_date = '2021-08-01' AND b.submission_date = '2021-08-01' AND c.submission_date = '2021-08-01')
OR (a.submission_date = '2021-09-01' AND b.submission_date = '2021-09-01' AND c.submission_date = '2021-09-01'))
GROUP BY a.state, a.id, b.id, c.series_complete_pop_pct, d.population
ORDER BY a.submission_date ASC, a.unemployment_rate DESC;

--CA vs TX cases and unemploment
SELECT a.submission_date, a.state, a.unemployment_rate, b.tot_cases, b.tot_death, ((b.tot_death::FLOAT)/(b.tot_cases::FLOAT))*100::FLOAT case_death_percentage, c.series_complete_pop_pct
FROM us_unemployment a 
LEFT JOIN covid_case_death b
ON a.state = b.state
LEFT JOIN covid_vac c
ON a.state = c.state
WHERE ((a.state = 'CA' AND b.state = 'CA') OR (a.state = 'TX' AND b.state = 'TX')) 
AND ((a.submission_date = '2021-01-01' AND b.submission_date = '2021-01-01' AND c.submission_date = '2021-01-01')
OR (a.submission_date = '2021-02-01' AND b.submission_date = '2021-02-01' AND c.submission_date = '2021-02-01')
OR (a.submission_date = '2021-03-01' AND b.submission_date = '2021-03-01' AND c.submission_date = '2021-03-01')
OR (a.submission_date = '2021-04-01' AND b.submission_date = '2021-04-01' AND c.submission_date = '2021-04-01')
OR (a.submission_date = '2021-05-01' AND b.submission_date = '2021-05-01' AND c.submission_date = '2021-05-01')
OR (a.submission_date = '2021-06-01' AND b.submission_date = '2021-06-01' AND c.submission_date = '2021-06-01')
OR (a.submission_date = '2021-07-01' AND b.submission_date = '2021-07-01' AND c.submission_date = '2021-07-01')
OR (a.submission_date = '2021-08-01' AND b.submission_date = '2021-08-01' AND c.submission_date = '2021-08-01')
OR (a.submission_date = '2021-09-01' AND b.submission_date = '2021-09-01' AND c.submission_date = '2021-09-01'))
GROUP BY a.state, a.id, b.id, c.series_complete_pop_pct
ORDER BY a.submission_date ASC, a.unemployment_rate DESC;

--States Vaccination Percentages
SELECT state, series_complete_pop_pct 
FROM covid_vac
WHERE submission_date = '10-28-2021'
ORDER BY series_complete_pop_pct DESC;










