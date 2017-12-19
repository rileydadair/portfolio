$(document).ready(function () {
  // Animate intro text ********************************************************
  TweenMax.staggerTo(".link-main div", .23, { opacity: 1, y: 0, delay: 0.2 }, 0.08);

  // Animate background lines **************************************************
  const tl = new TimelineMax();
  const wiggleDuration = 1;
  const wiggleAmount = 1;
  const wiggleDistance = 300;
  const pauseDuration = 3;

  tl.set($('.line-inside'), { x: -300 })
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

  // Hamburger hover ***********************************************************
  let clicked = false;

  $(".hamburger").hover(over, out);
  function over() {
    if (!clicked) {
      TweenMax.to($(this).find(".hamburger-hover"), 0.1, { opacity: 1 })
      TweenMax.to($(this).find(".hamburger-hover"), 0.3, { ease: Power1.easeOut, x: 0 })
    }
  }
  function out() {
    if (!clicked) {
      TweenMax.to($(this).find(".hamburger-hover"), 0.3, { ease: Power1.easeOut, x: 20, overwrite: "all" })
      TweenMax.to($(this).find(".hamburger-hover"), 0, { opacity: 0, delay: 0.3 })
      TweenMax.to($(this).find(".hamburger-hover"), 0, { x: -20, delay: 0.3 })
    }
  }

  // Toggle nav ****************************************************************
  toggleNav = () => {
    $('.hamburger').toggleClass('active')
    if (!clicked) {
      function animate() {
        TweenMax.to(".hamburger-hover", 0, { opacity: 0 })
        TweenMax.to(".hamburger-hover", 0, { x: -20 })
        $('#navigation').addClass('active')
        TweenMax.staggerTo(".nav-title", .2, { opacity: 1, y: 0, delay: 0.5 }, 0.1);
        TweenMax.staggerTo(".nav-subtitle", .2, { opacity: 1, y: 0, delay: 0.8 }, 0.1);
        TweenMax.staggerTo(".nav-number", .4, { rotation: -90, delay: 1.1 }, 0.1);
        TweenMax.staggerTo(".nav-number", .3, { opacity: 1, delay: 1.1 }, 0.2);
      }
      setTimeout(function () {
        animate()
      }, 10);
      clicked = true;
    }
    else {
      setTimeout(function () {
        $('#navigation').removeClass('active')
      }, 900)

      function animate() {
        TweenMax.staggerTo(".nav-subtitle", .1, { opacity: 0, y: 40 }, -0.1);
        TweenMax.staggerTo(".nav-title", .2, { opacity: 0, y: 40, delay: 0.4 }, -0.1);
        TweenMax.staggerTo(".nav-number", .3, { rotation: 0, delay: 0.6 }, -0.1);
        TweenMax.staggerTo(".nav-number", .2, { opacity: 0, delay: 0.6 }, -0.2);
      }
      setTimeout(function () {
        animate()
      }, 10);
      clicked = false;
    }
  }

  // Change hamburger color in dark sections ***********************************
  $(window).scroll(function () {
    const x = $('body')[0].offsetWidth;
    const y = $(this).scrollTop();
    const portfolioPos = $('#portfolio').position();
    const portfolioHt = $('#portfolio')[0].offsetHeight;
    const contactPos = $('#contact').position();

    if (x > 1100) {
      if (y >= (portfolioPos.top - 50) && y <= (portfolioPos.top + portfolioHt - 50)) {
        $('.hamburger').addClass('white');
      } else if (y >= (contactPos.top - 50)) {
        $('.hamburger').addClass('white');
      }
      else {
        $('.hamburger').removeClass('white');
      }
    } else {
      if (y >= (contactPos.top - 30)) {
        $('.hamburger').addClass('white');
      } else {
        $('.hamburger').removeClass('white');
      }
    }
  });

  // Slide in animation ********************************************************
  // Debounce function to wait every 20 milliseconds
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const sliderImages = document.querySelectorAll('.card');

  function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
      // The pixel level at the top fourth the of the image, relative to the bottom of the window
      const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.clientHeight / 4;
      const offsetTop = sliderImage.offsetParent.offsetParent.offsetTop + sliderImage.offsetParent.offsetTop;
      const isHalfShown = slideInAt > offsetTop;
      if (isHalfShown) {
        sliderImage.classList.add('active');
      }
      else {
        sliderImage.classList.remove('active');
      }
    })
  }
  window.addEventListener('scroll', debounce(checkSlide));
});
