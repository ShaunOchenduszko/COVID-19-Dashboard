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

function createMarkers(response) {

  console.log(response)
  var stateborder = new L.layerGroup()

  L.geoJson(response, {
      color: "#50a573",
      weight:2,

      onEachFeature: function(feature,layer) {
          layer.bindPopup(`<h1>${feature.properties.NAME}<h/1>`);
      }
  }).addTo(stateborder)
  

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(stateborder);
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://raw.githubusercontent.com/ShaunOchenduszko/COVID-19-Visualization/Rbranch/Resources/geoJSON_usa.json").then(createMarkers);