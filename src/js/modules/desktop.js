import Smooth from './smooth';
import Hover from './hover';
import TweenMax from 'gsap';

export default {
  init() {
    this.current = 0;
    this.hovers = [];
    this.DOM = {};
    this.DOM.links = document.querySelectorAll('.js-link');
    this.DOM.toggleBtn = document.querySelector('.js-toggle');
    
    this.smoothScroll = new Smooth({
      callback: this.updateScrollPos.bind(this),
      preload: false,
      native: false,
      section: document.querySelector('.main'),
      vs : { mouseMultiplier: 0.4 },
    });

    this.smoothScroll.init();

    this.DOM.links.forEach(el => {
      this.hovers.push(new Hover(el));
    });

    this.DOM.toggleBtn.addEventListener('click', () => this.toggleTheme());
  },

  updateScrollPos(vars) {
    const current = Math.round(vars.current);
    if (this.current !== current) {
      this.hovers.forEach(hover => hover.updateScrollPos(current));
    }

    this.current = current;
  },

  toggleTheme() {
    document.body.classList.toggle('light-theme');
  }
};
