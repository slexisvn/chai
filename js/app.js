
(function(d) {
  d.fn.rkmd_rippleEffect = function() {
    let a, b, c, f, g, h, k;
    d(this).on("mousedown", function(e) {
      a = d(this);
      if (2 === e.button) return !1;
      0 === a.find(".ripple").length && a.prepend('<span class="ripple"></span>');
      b = a.find(".ripple");
      b.removeClass("animated");
      h = a.outerWidth();
      k = a.outerHeight();
      c = Math.max(h, k);
      b.css({ width: c, height: c });
      f = parseInt(e.pageX - a.offset().left) - c / 2;
      g = parseInt(e.pageY - a.offset().top) - c / 2;
      b.css({ top: g + "px", left: f + "px" }).addClass("animated");
      setTimeout(function() { b.remove() },
        800)
    })
  }
})(jQuery);

$('#search_key').focus(function() {
  $('.searchbar-icon, .searchbar-disable-button').addClass('searchbar-enabled');
  if ($(this).val() === '') {
    $('.col').show()
  }
}).blur(function() {
  $('.searchbar-icon, .searchbar-disable-button').removeClass('searchbar-enabled');
});

$('#reactivity_series_btn').click(function() {
  $('#reactivity_series').slideToggle('slow')
});

function filter_tools() {
  let filter = search_key.value.toUpperCase();
  let parent = document.getElementsByClassName('card');
  let child;
  for (let i = 0; i < parent.length; i++) {
    child = parent[i].getElementsByTagName('a')[0].getElementsByTagName('span')[0];
    if (child.innerHTML.toUpperCase().includes(filter)) {
      document.getElementsByClassName('col')[i].style.display = "";
    } else {
      document.getElementsByClassName('col')[i].style.display = "none";
    }
  }
}