import '../scss/index.scss';
import States from './modules/states';
import page from './modules/page';

function app() {
  page.init(States.deviceType);

  document.body.classList.add(`is-${States.deviceType}`);

  if (States.isIE) document.body.classList.add('is-IE');
}

document.addEventListener('DOMContentLoaded', app);
