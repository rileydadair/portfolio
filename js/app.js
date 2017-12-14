$(document).ready(function(){

  var $animation_elements = $('.left');
  var $animation_elements_two = $('.right');
  var $animation_elements_three = $('.third');
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $('.left').addClass('in-view');
      }
      if ((element_bottom_position <= window_top_position) &&
          (element_top_position >= window_bottom_position)) {
        $element.removeClass('in-view');
      }
    });
  }

  function check_if_in_view_two() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements_two, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view-two');
      }
    });
  }

  function check_if_in_view_three() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements_three, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view-three');
      }
    });
  }

  $window.on('scroll resize', check_if_in_view);
  $window.on('scroll resize', check_if_in_view_two);
  $window.on('scroll resize', check_if_in_view_three);
  $window.trigger('scroll');

  // Animate line
  let tl = new TimelineMax();

  var wiggleDuration = 1;
  var wiggleAmount = 1;
  var wiggleDistance = 300;
  var pauseDuration = 3;

  tl.set($('.line-inside'), {x: -300})
  .to($('.line-inside'), (wiggleDuration), {
    x: (0 - wiggleDistance)
  })
  .fromTo($('.line-inside'), wiggleDuration, {
  x: (0 - wiggleDistance),
  immediateRender: false
  }, {
    x: wiggleDistance,
  })
  .to($('.line-inside'), (wiggleDuration), {
  x: -300, ease: Power2.easeOut, delay: 3
  })
  .repeatDelay(pauseDuration)
  // Repeats the timeline indefinitely.
  .repeat(-1);



  // Animate intro text
  TweenMax.staggerTo(".link-main div", .23, {opacity:1, y:0, delay:0.2}, 0.08);

  let clicked = false
  // Hamburger hover
  $(".hamburger").hover(over, out);
  function over() {
    if(!clicked){
      TweenMax.to($(this).find(".hamburger-hover"), 0.1, {opacity:1})
      TweenMax.to($(this).find(".hamburger-hover"), 0.3, {ease: Power1.easeOut, x:0})
    }
  }
  function out(){
    if(!clicked) {
      TweenMax.to($(this).find(".hamburger-hover"), 0.3, {ease: Power1.easeOut, x:20, overwrite:"all"})
      TweenMax.to($(this).find(".hamburger-hover"), 0, {opacity:0, delay:0.3})
      TweenMax.to($(this).find(".hamburger-hover"), 0, {x:-20, delay:0.3})
    }
  }
  // Toggle nav
  toggleNav = () => {
    $('.hamburger').toggleClass('active')
    if(!clicked) {
      function animate(){
        TweenMax.to(".hamburger-hover", 0, {opacity:0})
        TweenMax.to(".hamburger-hover", 0, {x:-20})
        $('#navigation').addClass('active')
        TweenMax.staggerTo(".nav-title", .2, {opacity:1, y:0, delay:0.5}, 0.1);
        TweenMax.staggerTo(".nav-subtitle", .2, {opacity:1, y:0, delay:0.8}, 0.1);
        TweenMax.staggerTo(".nav-number", .4, {rotation: -90, delay:1.1}, 0.1);
        TweenMax.staggerTo(".nav-number", .3, {opacity:1, delay:1.1 }, 0.2);
      }
      setTimeout(function(){
        animate()
      }, 10);
      clicked = true
    }
    else {
      setTimeout(function(){
        $('#navigation').removeClass('active')
      }, 900)

      function animate(){
        TweenMax.staggerTo(".nav-subtitle", .1, {opacity:0, y:40}, -0.1);
        TweenMax.staggerTo(".nav-title", .2, {opacity:0, y:40, delay:0.4}, -0.1);
        TweenMax.staggerTo(".nav-number", .3, {rotation: 0, delay:0.6}, -0.1);
        TweenMax.staggerTo(".nav-number", .2, {opacity: 0, delay:0.6}, -0.2);
      }
      setTimeout(function(){
        animate()
      }, 10);
      clicked = false
    }
  }

  // Change hamburger color
  $(window).scroll(function () {
    const x = $('body')[0].offsetWidth;
    const y = $(this).scrollTop();
    const portfolioPos = $('#portfolio').position();
    const portfolioHt = $('#portfolio')[0].offsetHeight;
    const contactPos = $('#contact').position();

    if(x > 1100) {
      console.log('portfolio');
      if (y >= (portfolioPos.top - 50) && y <= (portfolioPos.top + portfolioHt - 50)) {
        console.log('white');
        $('.hamburger').addClass('white');
      } else if(y >= (contactPos.top - 50)) {
        $('.hamburger').addClass('white');
      }
      else {
        $('.hamburger').removeClass('white');
      }
    } else {
      if(y >= (contactPos.top - 50)) {
        $('.hamburger').addClass('white');
      } else {
        $('.hamburger').removeClass('white');
      }
    }
  });

});
