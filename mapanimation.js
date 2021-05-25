// code from: https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/ 
// add your own access token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2ViZGV2MjAyMSIsImEiOiJja29od2N0aDkwcWNlMndvYTVveXU2M2xzIn0.xQfYLQKMYZUPHrT6DLL-3A';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.08927333556, 42.350803759733076],
  zoom: 13,
});

map.on('load', function () {
  map.addSource('route', {
    'type': 'geojson',
    'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'LineString',
            'coordinates': [
                [-71.083892, 42.329903],
                [-71.082641, 42.330967],
                [-71.081259, 42.332322],
                [-71.079590, 42.332025],
                [-71.076352, 42.331676],
                [-71.073566, 42.333841],
                [-71.074944, 42.334976],
                [-71.076949, 42.336618],
                [-71.080341, 42.339470],
                [-71.083089, 42.341566],
                [-71.084232, 42.342467],
                [-71.087082, 42.345529], 
                [-71.093729, 42.359244],
                [-71.094915, 42.360175],
                [-71.0958, 42.360698],
                [-71.099558, 42.362953],
                [-71.103476, 42.365248],
                [-71.106067, 42.366806],
                [-71.108717, 42.368355],
                [-71.110799, 42.369192],
                [-71.113095, 42.370218],
                [-71.115476, 42.372085],
                [-71.117585, 42.373016],
                [-71.11744079074705, 42.373143738772235],
            ]
        }
    }
  });

  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
        'line-join': 'round',
        'line-cap': 'round'
    },
    'paint': {
        'line-color': '#888',
        'line-width': 5
    }
  });
});
  

// This array contains the coordinates for all bus stops of route #1
async function addBus(){

    // get bus data
    const locations = await getBusLocations();
    console.log(new Date());
    var buses = locations.length;

    for (let i=0; i<= mapMarkers.length - 1; i++ ) {
    mapMarkers[i].remove();
    }
    
    mapMarkers = [];

    for (let i = 0; i <= buses - 1; i++){
    // locations.forEach(function(marker) {
            if(locations[i].attributes.direction_id == 1){
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'inbound';
    
        // make a marker for each feature and add to the map
        var newmarker = new mapboxgl.Marker(el)
        .setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude]).addTo(map);
        
        mapMarkers.push(newmarker);
        } else{
        var el = document.createElement('div');
        el.className = 'outbound';

        // make a marker for each feature and add to the map
        var newmarker = new mapboxgl.Marker(el)
        .setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude]).addTo(map)
    
        mapMarkers.push(newmarker);
        }
    };
    setTimeout(addBus, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
}

let mapMarkers = [];
// fire the function
addBus();