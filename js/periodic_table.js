
$('#search_elements').css({
  'overflow': 'auto',
  'height': `${window.innerHeight - 80}px`
});

$('.legend li[class^="type-"]').click(function() {
  let currentClass = $(this).attr('class').split(' ')[0];
  if (currentClass != 'empty') {
    $('.main > li').addClass('deactivate');
    $('.' + currentClass).removeClass('deactivate')
  }
});
$('.main > li').click(function() {
  let currentClass = $(this).attr('class').split(' ')[0];
  $('.main > li').removeClass('deactivate')
});

$('#search_elements a, .main a').click(function() {
  elept = $(this).attr('href').replace('#', '');
  $(this).attr('href', 'elements.html');
});