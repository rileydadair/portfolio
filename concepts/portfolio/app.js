const projects = document.querySelectorAll('.project'),
      headerItems = document.querySelectorAll('.project-header');
      descriptionItems = document.querySelectorAll('.project-description'),
      maskHeaders = document.querySelectorAll('.mask-header'),
      maskVideos = document.querySelectorAll('.mask-below'),
      maskItems = document.querySelectorAll('.mask-item'),
      videos = document.querySelectorAll('video');

let   current = 0,
      target;

const folio = {
  init: () => {
    folio.ready();
    folio.headerDelay();
    folio.descriptionDelay();
    folio.maskDelay();
    maskItems.forEach(item => item.addEventListener('transitionend', folio.transitionEnd));
    // projects[0].classList.add('active');
    current = projects.length - 1;
    target = projects[current];
    setTimeout(() => {
      folio.next();
    }, 300);
  },
  ready: () => {
    window.addEventListener('mousewheel', folio.slide);
    videos[current].play();
    maskVideos[current].classList.add('active');
  },
  slide: (e) => {
    e.preventDefault();
    window.removeEventListener('mousewheel', folio.slide);
    target = projects[current];
    e.deltaY > 0 ? folio.next() : folio.previous();
  },
  next: () => {
    TweenMax.to(target, .25, {
      opacity: 0,
      y: -200,
      onComplete() {
        folio.reset();
        if (current === projects.length - 1) current = -1;
        current++;
        projects[current].classList.add('active');
      }
    })    
  },
  previous: () => {
    TweenMax.to(target, .25, {
      opacity: 0,
      y: 200,
      onComplete() {
        folio.reset();
        if (current === 0) current = projects.length;
        current--;
        projects[current].classList.add('active');
      }
    })      
  },
  reset: () => {
    projects.forEach(project => project.classList.remove('active'))
    videos[current].pause();
    maskVideos[current].classList.remove('active');
  },
  transitionEnd: (e) => {
    if (e.propertyName !== 'transform') return;
    TweenMax.to(target, 0.1, {
      opacity: 1,
      y: 0,
      onComplete() {
        folio.ready();
      },
    })
  },
  headerDelay: () => {
    headerItems.forEach(part => {
      const seconds = 0.015,
        children = part.childNodes,
        arr = [...children];

      let count = 1;

      arr.forEach(child => {
        if (child.classList) {
          const delay = count * seconds;
          child.firstChild.style.transitionDelay = `${delay}s`;
          count++;
        }
      })
    })
  },
  descriptionDelay: () => {
    descriptionItems.forEach(part => {
      const seconds = .04,
        activeDelay = 0.2,
        children = part.childNodes,
        arr = [...children];

      let count = 1;

      arr.forEach(child => {
        if (child.classList) {
          let delay = count * seconds + activeDelay;
          child.firstElementChild.style.transitionDelay = `${delay}s`;
          count++;
        }
      })
    })
  },
  maskDelay: () => {
    maskHeaders.forEach(part => {
      const seconds = .02,
        activeDelay = 0.1,
        children = part.childNodes,
        arr = [...children];

      let count = 1;
      
      arr.forEach(child => {
        if (child.classList) {
          let delay = count * seconds + activeDelay;
          child.style.transitionDelay = `${delay}s`;
          count++;
        }
      })
    })
  }
}

folio.init();
