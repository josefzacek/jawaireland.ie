//= require popper
//= require bootstrap

$( document ).ready(function() {
  // hide home-page-video if user is on tablet and mobile devices (otherwise video not working on tablet/mobile)
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('.home-page-video').css('visibility', 'hidden');
  }

  // leaflet map on contact page
  if ($('#leaflet-map').length) {
    var map = L.map('leaflet-map').setView([53.349729, -6.260631], 11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([53.349729, -6.260631]).addTo(map).bindPopup('JAWA Ireland');

    map.dragging.disable();
    map.scrollWheelZoom.disable();
  }

});
