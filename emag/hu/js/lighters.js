if (jQuery().owlCarousel) {
  var owl = $('.owl-carousel');
  var prev = $('.lighters__nav__prev');
  var next = $('.lighters__nav__next');
  var cta = $('.showLighters');
  var lighters = $('.lighters');
  var dot = $('.lighters__dot');

  cta.on('click', function (e) {
    e.preventDefault();
    lighters.show().animate({
      opacity: 1
    }, 250);
  });

  owl.owlCarousel({
    loop: false,
    nav:  true,
    dots: true,
    items: 1,
    touchDrag: true,
    mouseDrag: false,
    navText: ['&nbsp;','&nbsp;'],
    onTranslate: function () {
      owl.addClass('animated');
    },
    onTranslated: function () {
      owl.removeClass('animated');
    }
  });

  prev.on('click', function () {
    owl.trigger('prev.owl.carousel');
  });

  next.on('click', function () {
    owl.trigger('next.owl.carousel');
  });

  dot.on('click', function () {
    var prevIndex = 0 || prev;
    var i = $(this).index();

    if(prevIndex !== i ) {
      owl.trigger('to.owl.carousel', [i, 250]);
    }
  });
}