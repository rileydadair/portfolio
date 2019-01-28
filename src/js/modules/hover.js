class Hover {
  constructor(el) {
    this.currentScrollPos = 0;
    this.DOM = {el: el};
    this.totalImages = 4;
    for (let i = 0; i <= this.totalImages-1; ++i) {
      const image = document.createElement('div');
      image.className = "hover-img";
      image.style = `background-image:url(${this.DOM.el.dataset.img})`;
      this.DOM.el.appendChild(image);
    }
    this.DOM.revealImgs = Array.from(this.DOM.el.querySelectorAll('.hover-img'));
    this.initEvents();
  }

  initEvents() {
    this.positionElement = (e) => {
      let { clientX: x, clientY: y } = e;

      TweenMax.staggerTo(this.DOM.revealImgs, 0, {
        ease: 'Power2.easeOut',
        x: x,
        y: y + this.currentScrollPos,
        scale: 1,
      }, -.015);
    };

    this.mouseenterFn = (e) => {
      this.positionElement(e);
      this.showImage();
    };
    this.mousemoveFn = e => requestAnimationFrame(() => {
        this.positionElement(e);
    });
    this.mouseleaveFn = () => {
        this.hideImage();
    };

    TweenMax.set(this.DOM.revealImgs, {
      x: `${this.DOM.el.getBoundingClientRect().x + 300}px`,
      y: `${this.DOM.el.getBoundingClientRect().y + 200}px`,
      scale: 1.2
    });
    
    this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
    this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
    this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
  }

  showImage() {
    document.body.classList.add('is-hovering');
  }

  hideImage() {
    document.body.classList.remove('is-hovering');
    TweenMax.set(this.DOM.revealImgs, {scale: 1.2});
  }

  updateScrollPos(val) {
    this.currentScrollPos = val;
  }
};

export default Hover;
