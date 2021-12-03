var dropdownMenu = d3.select("#Dates");
var date = dropdownMenu.property("value");

var map = L.map("map", {
  center: [47.283049, -120.760049],
  zoom: 2.5
})

// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var control;

// Initialize with default date
d3.json(`/cov1/${date}`).then(date=> {
  d3.json("https://raw.githubusercontent.com/ShaunOchenduszko/COVID-19-Visualization/Rbranch/Resources/geoJSON_usa.json").then(features =>{
    var stateborder = new L.layerGroup()

  new L.geoJson(features, {
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

  var overlayMaps = {
    "statesborder": stateborder
  }
  
  control = L.control.layers(overlayMaps);
  control.addTo(map);
  
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  });
})


// Update map layers
function createMap(statesborder) {
  var overlayMaps = {
    "statesborder": statesborder
  }

  map.removeControl(control);

  map.eachLayer(function (layer){
    map.removeLayer(layer);
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  control = L.control.layers(overlayMaps).addTo(map);

}

// Create markers and popups
function createMarkers(date, features) {

  var stateborder = new L.layerGroup()

  new L.geoJson(features, {
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
  })
}

// Default state
var dropdownMenu = d3.select("#States");
var state = dropdownMenu.property("value");


// For visualization charts
function StateChanged(){
  var dropdownMenu = d3.select("#States");
  var state = dropdownMenu.property("value");
  
  d3.json(`/cov/${state}`).then(data=> {
      createChart(data)
  })

}

