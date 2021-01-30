function createMap(bikeStations) {

    // Create the tile layer that will be the background of our map
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Dark Map": darkmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Earthquakes": bikeStations
    };
  
    // Create the map object with options
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [darkmap, bikeStations]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property off of response.data
    var event = response.features;
  
    // Initialize an array to hold bike markers
    var event_markers = [];
  
    // Loop through the stations array
    for (var index = 0; index < event.length; index++) {
      var earthquake = event[index];

  
      // For each station, create a marker and bind a popup with the station's name
      var event_marker = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0] ])
        .bindPopup("<h3>" + earthquake.geometry.coordinates[2] + "<h3><h3>Capacity: " + earthquake.geometry.coordinates[2] + "</h3>");
  
      // Add the marker to the event_markers array
      event_markers.push(event_marker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(event_markers));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);
  