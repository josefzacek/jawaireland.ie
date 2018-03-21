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

/* Light YouTube Embeds by @labnol on videos page */
/* Web: http://labnol.org/?p=27941 */
document.addEventListener("DOMContentLoaded",
  function() {
    var div, n,
        v = document.getElementsByClassName("videos-page-youtube-video");
    for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.innerHTML = labnolThumb(v[n].dataset.id);
        div.onclick = labnolIframe;
        v[n].appendChild(div);
    }
  }
);

function labnolThumb(id) {
  var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
    play = '<div class="play"></div>';
  return thumb.replace("ID", id) + play;
}

function labnolIframe() {
  var iframe = document.createElement("iframe");
  var embed = "https://www.youtube.com/embed/ID?rel=0&autoplay=1";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}
