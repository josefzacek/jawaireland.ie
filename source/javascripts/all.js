//= require popper
//= require bootstrap

$( document ).ready(function() {
  // hide home-page-video if user is on tablet and mobile devices (otherwise video not working on tablet/mobile)
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('.home-page-video').css('visibility', 'hidden');
  }

  // arrow down on home page
  var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var navbarHeight = $('nav.navbar').height();

  if (deviceWidth > 1400 ){
      if ($('.scroll-down-holder').length) {
          $(window).scroll(function() {
              if ($(window).scrollTop() >= navbarHeight) {
                  $('.scroll-down-holder').fadeOut(500);
              } else {
                  $('.scroll-down-holder').fadeIn(500);
              }
          })
      }
  } else {
      $('.scroll-down-holder').hide();
  }

  // leaflet map on contact page
  if ($('#leaflet-map').length) {
    var map = L.map('leaflet-map').setView([53.6531122,-6.6861977], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // remove marker
    // L.marker([53.6531122,-6.6861977]).addTo(map).bindPopup('JAWA Ireland');

    map.dragging.disable();
    map.scrollWheelZoom.disable();
  }

  // history timeline animation
  var $timeline_item = $('.history-timeline ul.timeline > li');

  //hide timeline blocks which are outside the viewport
  $timeline_item.each(function() {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 1) {
      $(this).find('.timeline-panel').addClass('invisible');
    }
  });

  //show timeline blocks as user scrolls down
  $(window).on('scroll', function() {
    $timeline_item.each(function() {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.timeline-panel').hasClass('invisible')) {
        $(this).find('.timeline-panel').removeClass('invisible');
      }
    });
  });

  // masonry layout on posters page + lazy images loading
  function reloadMansoryLayout(){
    $("img.lazy-loaded-image").on('load', function() {
      var mansoryGrid = new Masonry( '.single-event-grid');
      mansoryGrid.reloadItems();
    });
  }

  reloadMansoryLayout();

  // pop up on models page
  $(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault()
    $(this).ekkoLightbox()
  })

});

// submit contact form via Ajax
$("form.contact-form").submit(function(e){
    e.preventDefault();
    var href = $(this).attr("action");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: href,
        data: $(this).serialize(),
        success: function(response){
            if(response.status == "success"){
                $("form.contact-form").addClass("d-none");
                $(".form-submitted").removeClass("d-none");
            }else{
                $(".form-error").removeClass("d-none");
            }
        }
    });
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
    play = '<div class="play-button"></div>';
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

// lazy load on models page
var myLazyLoad = new LazyLoad({
  elements_selector: '.lazy-loaded-image',
  threshold: 200
})

// keyrings pagee slider
$('.keyrings .slider').slick({
  centerPadding: '30px',
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
  responsive: [
    {
      breakpoint: 992,
      settings: {
        centerPadding: '20px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        centerPadding: '20px',
        slidesToShow: 1,
        dots: false
      }
    }
  ]
});
