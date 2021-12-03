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

// For visualization charts
function StateChanged(){
  var dropdownMenu = d3.select("#States");
  var state = dropdownMenu.property("value");
  
  d3.json(`/cov/${state}`).then(data=> {
      console.log(data);
  })

}

