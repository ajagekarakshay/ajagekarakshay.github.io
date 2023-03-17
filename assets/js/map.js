const map = L.map('map').setView([10, 0], 2);
    
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// hover and click functions

function hover(e, label) { var popup = L.popup().setLatLng(e.latlng).setContent(label).openOn(map); }

// Singapore
var c1 = L.circleMarker([1.3521, 103.8198], {
  win_url: "forms/singapore.html",
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 3
}).bindTooltip(`Singapore`).addTo(map).on('click', function(e){ window.open(e.target.options.win_url) } );

// Goa
var c2 = L.circleMarker([15.2993, 74.1240], {
  win_url: "forms/goa.html",
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 1
}).bindTooltip(`Goa`).addTo(map).on('click', function(e){ window.open(e.target.options.win_url) } );


// circle.bindPopup("Popup content");
// marker.on('mouseover', function (e) {
//     this.openPopup();
// });
// marker.on('mouseout', function (e) {
//     this.closePopup();
// });

