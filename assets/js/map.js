//// all data 

const locs = {
  //countries
  Singapore: { main: [1.3521, 103.8198],
              radius: 3,
              zoom: 5 },
  India: {
    main: [20.5937, 78.9629],
    radius: 5,
    zoom: 5,
    "Goa": [15.2993, 74.1240],
    "Mumbai": [19.0760, 72.8777],
    "Pune": [18.5204, 73.8567],
    "Kolhapur": [16.7050, 74.2433],
    "Aurangabad": [19.8762, 75.3433],
    "Ratnagiri": [16.9902, 73.312],
    "Shegaon": [20.7930, 76.691],
    "Patna": [25.5941, 85.1376],
    "Kolkata": [22.5726, 88.3639],
    "Varanasi": [25.3176, 82.9739],
    "Delhi": [28.7041, 77.1025],
    "Agra": [27.1767, 78.0081],
    "Mathura": [27.4924, 77.6737],
    "Amritsar": [31.6340, 74.8723],
    "Manali": [32.2432, 77.1892],
    "Srinagar": [34.0837, 74.7973],
    "Bengaluru": [12.9716, 77.5946],
    "Mysore": [12.2958, 76.6394],
    "Ooty": [11.4102, 76.6950],
    "Chennai": [13.0827, 80.2707],
    "Varkala": [8.7379, 76.7163],
    "Munnar": [10.0889, 77.0595],
    "Puducherry": [11.9416, 79.8083],
  },
  Indonesia: {
    main: [-0.789275, 113.921327],
    radius: 3,
    zoom: 5,
    "Bali": [-8.409518, 115.18891],
    "Nusa Penida": [-8.727807, 115.544426],
},
  Barbados: {
    main: [13.193887, -59.543198],
    radius:3,
    zoom: 7
  },
  USA: {
    main: [39.385264, -100.538072],
    radius:5,
    zoom: 4,
    "New York": [40.730610, -73.935242],
    "Washington, D.C": [38.9072,  -77.009056],
    "Roanoke": [37.270969, -79.941429],
    "Philadelphia": [39.9526, -75.1652],
    "Cleveland": [41.4993, -81.6944],
    "Syracuse": [43.0481, -76.1474],
    "Binghamton": [42.0988, -75.92064],
    "Ithaca": [42.4440, -76.5019],
    "Buffalo": [42.8864, -78.8784],

  }
}


const blog = {
  "Goa": "goa.html",
  "Bali": "bali.html#bali",
  "Nusa Penida": "bali.html#nusa",
  "Singapore": "singapore.html",
  "Barbados": "barbados.html"
}

// maps

const map = L.map('map').setView([10, 0], 2);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var MyControl = L.Control.extend({
  options: {
      position: 'topright'
  },

  onAdd: function (map) {
      // create the control container with a particular class name
      var container = L.DomUtil.create('div', 'my-custom-control');

      // ... initialize other DOM elements, add listeners, etc.

      return container;
  }
});

map.addControl(new MyControl('bar', {position: 'bottomleft'}));


// hover and click functions

function hover(e, label) { var popup = L.popup().setLatLng(e.latlng).setContent(label).openOn(map); }


const markers = []

for (const [key, value] of Object.entries(locs)) {
  //markers.push( 
    L.circleMarker(value.main, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: value.radius
    }).bindTooltip(key).addTo(map).on('click', function(e){
     map.flyTo(value.main, value.zoom);
     for (const [kc,vc] of Object.entries(value) ){
        if ((kc==="radius") || (kc=="zoom")) {continue;}
        city = kc;
        if (kc==="main"){city=key;}
        L.circleMarker(vc, {
          win_url: "forms/"+blog[city],
          color: 'purple',
          fillColor: 'purple',
          fillOpacity: 0.5,
          radius: 3,
        }).bindTooltip(city).addTo(map).on('click', function(e){
          window.open(e.target.options.win_url)
        });
     } 
    }) 
}

// // Singapore
// var c1 = L.circleMarker([1.3521, 103.8198], {
//   win_url: "forms/singapore.html",
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 3
// }).bindTooltip(`Singapore`).addTo(map).on('click', function(e){ window.open(e.target.options.win_url) } );

// // Goa
// var c2 = L.circleMarker([15.2993, 74.1240], {
//   win_url: "forms/goa.html",
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 1
// }).bindTooltip(`Goa`).addTo(map).on('click', function(e){ window.open(e.target.options.win_url) } );

// //Bali
// var c3 = L.circleMarker([-8.4095, 115.1889], {
//   win_url: "forms/bali.html",
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 3
// }).bindTooltip(`Bali`).addTo(map).on('click', function(e){ window.open(e.target.options.win_url) } );


// function polySelect(a){
//   map._layers[a].fire('click');  // 'clicks' on state name from search
//   var layer = map._layers[a];
//   map.fitBounds(layer.getBounds());  // zooms to selected poly
// }