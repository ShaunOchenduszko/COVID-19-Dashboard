function createMap(state) {

  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create the map object with options.
  var map = L.map("map-id", {
    center: [31.054487, -97.563461 ],
    zoom: 3,
    layers: [streetmap, state]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  
  // Pull the "stations" property from response.data.
  var feature = response.features;
  console.log(feature)
  var state = new L.layerGroup()

  L.geoJson(response, {
    color: "orange",
    weight:2
    ,
    onEachFeature: function(feature,layer) {
    layer.bindPopup(`<h1>${feature.properties.NAME}<h/1>`);
    }}).addTo(state)

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(state);
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("../../Resources/geoJSON_usa.json").then(createMarkers);
