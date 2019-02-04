import Smooth from './smooth';
import Hover from './hover';
import TweenMax from 'gsap';

export default {
  init(deviceType) {
    this.deviceType = deviceType;
    this.current = 0;
    this.hovers = [];
    this.DOM = {};
    this.DOM.scrolls = Array.from(document.querySelectorAll('.js-scroll'));
    
    this.smoothScroll = new Smooth({
      callback: this.handleScroll.bind(this),
      preload: false,
      native: false,
      section: document.querySelector('.main'),
      vs : { mouseMultiplier: 0.4 },
    });

    setTimeout(() => {
      this.checkScroll();
      this.smoothScroll.init();
    }, 500);
  },

  show(el) {
    TweenMax.to(el, 1, {
      startAt: { opacity: 0, x: '-5%' },
      opacity: 1,
      x: '0%',
      onComplete: () => {
        el.classList.add('is-shown');
        el.style = '';

        if (this.deviceType === 'desktop') {
          const hoverEls = el.querySelectorAll('.js-hover');

          hoverEls.forEach(el => {
            this.hovers.push(new Hover(el));
          });
        }
      }
    });
  },

  isInView(el, offset) {
    if (typeof el === 'undefined') return;

    const viewTop = 0;
    const viewBottom = viewTop + window.innerHeight;
    const elTop = el.getBoundingClientRect().top;
    const elOffset = elTop + el.clientHeight * offset;

    return elOffset <= viewBottom && elTop > viewTop;
  },

  checkScroll() {
    if (this.DOM.scrolls.length) {
      this.DOM.scrolls.forEach((el, index) => {
        if (this.isInView(el, .35)) {
          this.show(el);
          this.DOM.scrolls.splice(index, 1);
        }
      });
    }
  },

  handleScroll(vars) {
    this.checkScroll();

    if (this.deviceType === 'desktop') {
      const current = Math.round(vars.current);

      if (this.current !== current && this.hovers.length) {
        this.hovers.forEach(hover => hover.updateScrollPos(current));
      }
  
      this.current = current;
    }
  }
};
