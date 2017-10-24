//= require popper
//= require bootstrap

// hide home-page-video if user is on tablet and mobile devices (otherwise video not working on tablet/mobile)
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $('.home-page-video').css('visibility', 'hidden');
}
