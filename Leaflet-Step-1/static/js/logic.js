// OG Working Code

// function createMap(bikeStations) {

//     // Create the tile layer that will be the background of our map
//     var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "dark-v10",
//       accessToken: API_KEY
//     });
  
//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//       "Dark Map": darkmap
//     };
  
//     // Create an overlayMaps object to hold the bikeStations layer
//     var overlayMaps = {
//       "Earthquakes": bikeStations
//     };
  
//     // Create the map object with options
//     var map = L.map("map", {
//       center: [37.655961, -122.055910],
//       zoom: 7,
//       layers: [darkmap, bikeStations]
//     });
  
//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
// }
  
// function createMarkers(response) {

//     // Pull the "stations" property off of response.data
//     var event = response.features;

//     // Initialize an array to hold bike markers
//     var event_markers = [];

//     // Loop through the stations array
//     for (var index = 0; index < event.length; index++) {
//         var earthquake = event[index];


//         // For each station, create a marker and bind a popup with the station's name
//         var event_marker = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0] ])
//         .bindPopup("<h3>" + earthquake.properties.type +  
//         "<h3><h3>Location: " + earthquake.properties.place + 
//         "<h3><h3>Magnitude: " + earthquake.properties.mag + 
//         "<h3><h3>Longitude: " + earthquake.geometry.coordinates[0] + 
//         "<h3><h3>Latitude: " + earthquake.geometry.coordinates[1] + 
//         "<h3><h3>Depth (km): " + earthquake.geometry.coordinates[2] + 
//         "</h3>");

//         // Add the marker to the event_markers array
//         event_markers.push(event_marker);
//     }

//     // Create a layer group made from the bike markers array, pass it into the createMap function
//     createMap(L.layerGroup(event_markers));

    

// }



// // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);




// Develop new code

// URL for geo json data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

// Create the map object with options
var map = L.map("map", {
    center: [37.655961, -122.055910],
    zoom: 7,
});

d3.json(url, function(data) {
    event_data = data.features;
    createMap(event_data);
});


function createMap(event_data) {

    // Code to create a clean map
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
  
    darkmap.addTo(map);




    // set marker radius based on magnitude
    function quakeRadius(magnitude) {
        radius = ((magnitude === 0) ? (1) : magnitude * 5)
        return radius;
      }
  
      // function returns the stlye for the markers
      function getStyle(feature) {
  
        markerStyle = {
          opacity: 0.75,
          fillOpacity: 1,      
          color: "black",
          stroke: true,
          weight: 0.75,
          // set fillcolor by passing quake depth to getColor
          fillColor: getColor(feature.geometry.coordinates[2]),
          // set radius by passing quake magnitude to quakeRadius
          radius: quakeRadius(feature.properties.mag),
  
        };
        return markerStyle
      }
      
      // getColor function returns colors based on quake depth
        function getColor(depth) {
  
          var color = ((depth >= 100) ? ("#EE0000") : ((depth >= 80) ? ("#FF6333") : ((depth >= 60) ? ("#FFA500") : ((depth >= 40) ? ("#FFCC11"):  ((depth >= 20) ? ("#FFEE00"):"#ABCD00")))))
        
          return color;
        }

        event_layer = L.geoJson(event_data, {

            pointToLayer: function(feature, location) {
              return L.circleMarker(location);
            },
            style: getStyle,
    
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h3>" + feature.properties.type + 
                "<h3><h3>Location: " + feature.properties.place +
                "<h3><h3>Magnitude: " + feature.properties.mag + 
                "<h3><h3>Longitude: " + feature.geometry.coordinates[0] +
                "<h3><h3>Latitude: " + feature.geometry.coordinates[1] + 
                "<h3><h3>Depth (km): " + feature.geometry.coordinates[2] +
                "</h3>");
              }
    
          });
          
          event_layer.addTo(map);






}

