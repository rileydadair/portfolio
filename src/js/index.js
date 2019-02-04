import '../scss/index.scss';
import States from './modules/states';
import scroll from './modules/scroll';

function app() {
  scroll.init(States.deviceType);

  document.body.classList.add(`is-${States.deviceType}`);

  if (States.isIE) document.body.classList.add('is-IE');
}

document.addEventListener('DOMContentLoaded', app);
