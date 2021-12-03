var dropdownMenu = d3.select("#Dates");
var date = dropdownMenu.property("value");

// Initialize with default date
d3.json(`/cov1/${date}`).then(date=> {
  d3.json("https://raw.githubusercontent.com/ShaunOchenduszko/COVID-19-Visualization/Rbranch/Resources/geoJSON_usa.json").then(feature =>{
    createMarkers(date, feature);
  });
})

// Create map
function createMap(statesborder) {

  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create the map object with options.
  var map = L.map("map", {
    center: [47.283049, -120.760049],
    zoom: 2.5,
    layers: [streetmap, statesborder]
  });

}

// Create markers and popups
function createMarkers(date, features) {

  var feature = features.features
  console.log(feature)
  console.log(date)

  var stateborder = new L.layerGroup()

  list = []
  for (var i=0; i < feature.length; i++){
    var currentFfeature = feature[i]
    var currentState = currentFfeature.properties.NAME
    var stateAbbreviation = convertRegion(currentState, TO_ABBREVIATED)

    for (var j=0; j < date.length; j++){

      var currentDate = date[j]
      if (stateAbbreviation = currentDate.state) {
        var cases_per_100 = currentDate.cases_per_100
        var deaths_per_100 = currentDate.deaths_per_100
        var population = currentDate.population
        var series_complete_pop_pct = currentDate.series_complete_pop_pct
        var submission_date =  currentDate.submission_date
        var tot_cases =  currentDate.tot_cases
        var tot_death =  currentDate.tot_death
        var unemployment_rate = currentDate.unemployment_rate
      }
      list.push(stateAbbreviation)
      list.push(cases_per_100,deaths_per_100)
    }
  }
  console.log(list)

  L.geoJson(features, {
      color: "#50a573",
      weight:2,

      onEachFeature: function(feature,layer) {

          var currentState = feature.properties.NAME
          var stateAbbreviation = convertRegion(currentState, TO_ABBREVIATED)

          for (var j=0; j < date.length; j++){

            var currentDate = date[j]

            if (stateAbbreviation == currentDate.state) {
              var cases_per_100 = currentDate.cases_per_100
              var deaths_per_100 = currentDate.deaths_per_100
              var population = currentDate.population
              var series_complete_pop_pct = currentDate.series_complete_pop_pct
              var submission_date =  currentDate.submission_date
              var tot_cases =  currentDate.tot_cases
              var tot_death =  currentDate.tot_death
              var unemployment_rate = currentDate.unemployment_rate
            }
            
          }
          layer.bindPopup(`<h3>${feature.properties.NAME}</h3>
              <p>Submission Date: ${submission_date}</p>
              <p>Population: ${population}</p>
              <p>Vacinated Population: ${series_complete_pop_pct}</p>
              <p>Total Cases: ${tot_cases}</p>
              <p>Total Deaths: ${tot_death}</p>
              <p>Cases per 100: ${cases_per_100}</p>
              <p>Deaths per 100: ${deaths_per_100}</p>
              <p>Unemployment Rate: ${unemployment_rate}</p>`);
        }
          
  }).addTo(stateborder)
  

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(stateborder);
}

function DateChanged(){
  var dropdownMenu = d3.select("#Dates");
  var date = dropdownMenu.property("value");

  d3.json(`/cov1/${date}`).then(feature=> {
    d3.json("https://raw.githubusercontent.com/ShaunOchenduszko/COVID-19-Visualization/Rbranch/Resources/geoJSON_usa.json").then(map => {
      createMarkers(feature, map)
    });
    console.log(date)
  })
}

// Default state
var dropdownMenu = d3.select("#States");
var state = dropdownMenu.property("value");

function createChart(data){
      //Grab state abbr convert to full name
      var stateabb_array = data.vis_2.map(({state})=>state);
      var stateabb = convertRegion(stateabb_array.find(element => element != 0), TO_NAME);
      
      //vis 2a
      
      var vis_2a_trace1 = {
          x: data.vis_2.map(({submission_date})=>submission_date),
          y: data.vis_2.map(({cases_per_100})=>cases_per_100),
          type: 'bar',
          marker: {
              color: '#9ea7de',
              line: {
                  color: '#808080',
                  width: 2
              }
          }
      };
      
      var vis_2a_data = [vis_2a_trace1];
      
      var vis_2a_layout = {
          title: `${stateabb} Covid cases per 100 people`, 
      }
      
      Plotly.newPlot('vis_2a_div', vis_2a_data, vis_2a_layout)
    
      //vis 2b
      var vis_2b_trace1 = {
        x: data.vis_2.map(({submission_date})=>submission_date),
        y: data.vis_2.map(({deaths_per_100})=>deaths_per_100),
        type: 'bar',
        marker: {
            color: '#9ea7de',
            line: {
                color: '#808080',
                width: 2
            }
        }
      };

      var vis_2b_data = [vis_2b_trace1];

      var vis_2b_layout = {
        title: `${stateabb} Covid deaths per 100 people`,
      }

      Plotly.newPlot('vis_2b_div', vis_2b_data, vis_2b_layout)

      //vis 3a
      var vis_3a_trace1 = {
        x: data.vis_3.map(({submission_date})=>submission_date),
        y: data.vis_3.map(({tot_cases})=>tot_cases),
        type: 'bar',
        marker: {
            color: '#9ea7de',
            line: {
                color: '#808080',
                width: 2
            }
        }
      };

      var vis_3a_data = [vis_3a_trace1];

      var vis_3a_layout = {
        title: `${stateabb} Total Covid Cases`, 
      }

      Plotly.newPlot('vis_3a_div', vis_3a_data, vis_3a_layout)

      //vis 3b
      var vis_3b_trace1 = {
        x: data.vis_3.map(({submission_date})=>submission_date),
        y: data.vis_3.map(({tot_death})=>tot_death),
        type: 'bar',
        marker: {
            color: '#9ea7de',
            line: {
                color: '#808080',
                width: 2
            }
        }
      };

      var vis_3b_data = [vis_3b_trace1];

      var vis_3b_layout = {
        title: `${stateabb} Total Covid Deaths`, 
      }

      Plotly.newPlot('vis_3b_div', vis_3b_data, vis_3b_layout)

      //vis 4
      let vis_4_x = data.vis_4.map(({submission_date})=>submission_date);
      let vis_4_y = data.vis_4.map(({series_complete_pop_pct})=>series_complete_pop_pct);

      var vis_4_trace1 = {
          x: vis_4_x,
          y: vis_4_y,
          mode: 'lines',
          line: {
              color: '#9ea7de',
              opacity: 0.2,
              width: 4
          }
        };
        
        var vis_4_layout = {
          title: `${stateabb} Vaccination Rate Percentage`
        };
        
        var vis_4_data = [vis_4_trace1];
        
        Plotly.newPlot('vis_4_div', vis_4_data, vis_4_layout);

      //vis 5
      let vis_5_x = data.vis_5.map(({submission_date})=>submission_date);
      let vis_5_y = data.vis_5.map(({unemployment_rate})=>unemployment_rate);


      var vis_5_trace1 = {
          x: vis_5_x,
          y: vis_5_y,
          mode: 'lines',
          line: {
              color: '#9ea7de',
              opacity: 0.2,
              width: 4
          }
        };
        
        var vis_5_layout = {
          title: `${stateabb} Unemployment Rate Percentage`
        };
        
        var vis_5_data = [vis_5_trace1];
        
        Plotly.newPlot('vis_5_div', vis_5_data, vis_5_layout);

      //vis 6

      var vis_6_data = [{
        values: data.vis_6.map(({series_complete_janssen})=>series_complete_janssen).concat(data.vis_6.map(({series_complete_moderna})=>series_complete_moderna), data.vis_6.map(({series_complete_pfizer})=>series_complete_pfizer)),
        labels: ['Janssen', 'Moderna', 'Pfizer'],
        type: 'pie',
        marker: {
            colors: ['#808080', '#626789', '#9ea7de']
        }
      }];

      var layout = {
        title: `${stateabb} Vaccination Series Completed by Manufacturer`,
        height: 400,
        width: 800
      };

      Plotly.newPlot('vis_6_div', vis_6_data, layout);
}

// For visualization charts
function StateChanged(){
  var dropdownMenu = d3.select("#States");
  var state = dropdownMenu.property("value");
  
  d3.json(`/cov/${state}`).then(data=> {
      createChart(data);

}

  )}

  d3.json(`/cov/${state}`).then(data=> {
      //Grab state abbr convert to full name
      var stateabb_array = data.vis_2.map(({state})=>state);
      var stateabb = convertRegion(stateabb_array.find(element => element != 0), TO_NAME);
      
      //vis 2a
      
      var vis_2a_trace1 = {
          x: data.vis_2.map(({submission_date})=>submission_date),
          y: data.vis_2.map(({cases_per_100})=>cases_per_100),
          type: 'bar',
          marker: {
              color: '#9ea7de',
              line: {
                  color: '#808080',
                  width: 2
              }
          }
      };
      
      var vis_2a_data = [vis_2a_trace1];
      
      var vis_2a_layout = {
          title: `${stateabb} Covid cases per 100 people`, 
      }
      
      Plotly.newPlot('vis_2a_div', vis_2a_data, vis_2a_layout)
    
      //vis 2b
      var vis_2b_trace1 = {
        x: data.vis_2.map(({submission_date})=>submission_date),
        y: data.vis_2.map(({deaths_per_100})=>deaths_per_100),
        type: 'bar',
        marker: {
            color: '#9ea7de',
            line: {
                color: '#808080',
                width: 2
            }
        }
      };

      var vis_2b_data = [vis_2b_trace1];

      var vis_2b_layout = {
        title: `${stateabb} Covid deaths per 100 people`,
      }

      Plotly.newPlot('vis_2b_div', vis_2b_data, vis_2b_layout)

      //vis 3a
      var vis_3a_trace1 = {
        x: data.vis_3.map(({submission_date})=>submission_date),
        y: data.vis_3.map(({tot_cases})=>tot_cases),
        type: 'bar',
        marker: {
            color: '#9ea7de',
            line: {
                color: '#808080',
                width: 2
            }
        }
      };

      var vis_3a_data = [vis_3a_trace1];

      var vis_3a_layout = {
        title: `${stateabb} Total Covid Cases`, 
      }

      Plotly.newPlot('vis_3a_div', vis_3a_data, vis_3a_layout)

      //vis 3b
      var vis_3b_trace1 = {
        x: data.vis_3.map(({submission_date})=>submission_date),
        y: data.vis_3.map(({tot_death})=>tot_death),
        type: 'bar',
        marker: {
            color: '#9ea7de',
            line: {
                color: '#808080',
                width: 2
            }
        }
      };

      var vis_3b_data = [vis_3b_trace1];

      var vis_3b_layout = {
        title: `${stateabb} Total Covid Deaths`, 
      }

      Plotly.newPlot('vis_3b_div', vis_3b_data, vis_3b_layout)

      //vis 4
      let vis_4_x = data.vis_4.map(({submission_date})=>submission_date);
      let vis_4_y = data.vis_4.map(({series_complete_pop_pct})=>series_complete_pop_pct);

      var vis_4_trace1 = {
          x: vis_4_x,
          y: vis_4_y,
          mode: 'lines',
          line: {
              color: '#9ea7de',
              opacity: 0.2,
              width: 4
          }
        };
        
        var vis_4_layout = {
          title: `${stateabb} Vaccination Rate Percentage`
        };
        
        var vis_4_data = [vis_4_trace1];
        
        Plotly.newPlot('vis_4_div', vis_4_data, vis_4_layout);

      //vis 5
      let vis_5_x = data.vis_5.map(({submission_date})=>submission_date);
      let vis_5_y = data.vis_5.map(({unemployment_rate})=>unemployment_rate);


      var vis_5_trace1 = {
          x: vis_5_x,
          y: vis_5_y,
          mode: 'lines',
          line: {
              color: '#9ea7de',
              opacity: 0.2,
              width: 4
          }
        };
        
        var vis_5_layout = {
          title: `${stateabb} Unemployment Rate Percentage`
        };
        
        var vis_5_data = [vis_5_trace1];
        
        Plotly.newPlot('vis_5_div', vis_5_data, vis_5_layout);

      //vis 6

      var vis_6_data = [{
        values: data.vis_6.map(({series_complete_janssen})=>series_complete_janssen).concat(data.vis_6.map(({series_complete_moderna})=>series_complete_moderna), data.vis_6.map(({series_complete_pfizer})=>series_complete_pfizer)),
        labels: ['Janssen', 'Moderna', 'Pfizer'],
        type: 'pie',
        marker: {
            colors: ['#808080', '#626789', '#9ea7de']
        }
      }];

      var layout = {
        title: `${stateabb} Vaccination Series Completed by Manufacturer`,
        height: 400,
        width: 800
      };

      Plotly.newPlot('vis_6_div', vis_6_data, layout);
    
    })
