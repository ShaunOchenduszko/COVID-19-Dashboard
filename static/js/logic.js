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

  L.geoJson(features, {
      color: "#50a573",
      weight:2,

      onEachFeature: function(feature,layer) {

        for (var i=0; i < feature.length; i++){

          for (var j=0; j < date.length; j++){

          var currentFfeature = feature[i]
          var currentState = currentFfeature.properties.NAME
          var stateAbbreviation = convertRegion(currentState, TO_ABBREVIATED)

          var currentDate = date[j]


          if (stateAbbreviation == currentDate.state) {
            var cases_per_100 = currentFfeature.cases_per_100
            var deaths_per_100 = currentFfeature.deaths_per_100
            var population = currentFfeature.population
            var series_complete_pop_pct = currentFfeature.series_complete_pop_pct
            var submission_date =  currentFfeature.submission_date
            var tot_cases =  currentFfeature.tot_cases
            var tot_death =  currentFfeature.tot_death
            var unemployment_rate = currentFfeature.unemployment_rate
          }
        }
      }
          layer.bindPopup(`<h3>${feature.properties.NAME}<h/3>`);
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
      createMarkers(map, feature)
    });
      console.log(map);
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

