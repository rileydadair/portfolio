import '../scss/index.scss';
import States from './modules/states';
import desktop from './modules/desktop';
import hover from './modules/hover';

function app() {
  if (States.deviceType === 'desktop') desktop.init();

  document.body.classList.add(`is-${States.deviceType}`);

  if (States.isIE) document.body.classList.add('is-IE');
}

app();
