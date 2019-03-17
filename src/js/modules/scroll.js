import Smooth from './smooth';
import Hover from './hover';
import TweenMax from 'gsap';

export default {
  init(deviceType) {
    this.deviceType = deviceType;
    this.current = 0;
    this.hovers = [];
    this.mobileScroll = this.handleView.bind(this);
    this.DOM = {};
    this.DOM.scrolls = Array.from(document.querySelectorAll('.js-scroll'));
    
    if (this.deviceType === 'desktop') {
      this.smoothScroll = new Smooth({
        callback: this.handleScroll.bind(this),
        preload: false,
        native: false,
        section: document.querySelector('.main'),
        vs : { mouseMultiplier: 0.6 },
      });
    } else {
      this.initMobileEvents();
    }

    setTimeout(() => {
      this.handleView();
      if (this.deviceType === 'desktop') this.smoothScroll.init();
    }, 600);
  },

  initMobileEvents() {
    window.addEventListener('scroll', this.mobileScroll);
  },

  show(el) {
    TweenMax.to(el, 1, {
      startAt: { opacity: 0, x: '6%' },
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

  handleView() {
    if (this.DOM.scrolls.length) {
      this.DOM.scrolls.forEach((el, index) => {
        if (this.isInView(el, .35)) {
          this.show(el);
          this.DOM.scrolls.splice(index, 1);
        }
      });
    } else if (this.deviceType !== 'desktop') {
      window.removeEventListener('scroll', this.mobileScroll);
    }
  },

  handleScroll(vars) {
    this.handleView();

    if (this.deviceType === 'desktop') {
      const current = Math.round(vars.current);

      if (this.current !== current && this.hovers.length) {
        this.hovers.forEach(hover => hover.updateScrollPos(current));
      }
  
      this.current = current;
    }
  }
};
