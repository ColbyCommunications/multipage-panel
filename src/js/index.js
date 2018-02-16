import smoothscrollPolyfill from 'smoothscroll-polyfill';
import MultipagePanel from './MultipagePanel';

smoothscrollPolyfill.polyfill();

const getPageHash = () => {
  try {
    return window.location.hash;
  } catch (e) {
    return '';
  }
};

const getActivePageIndex = pages => {
  const hash = getPageHash();
  if (hash === '') {
    return 0;
  }

  for (let i = 0; i < pages.length; i += 1) {
    const id = pages[i].getAttribute('id');
    if (hash === `#${id}`) {
      return i;
    }
  }

  return 0;
};

const makeContainerBar = container => {
  const containerBar = document.createElement('DIV');
  container.parentNode.insertBefore(containerBar, container);
  return containerBar;
};

const initMultipagePanel = container => {
  const pages = [...document.querySelectorAll('[data-multipage-panel-page]')];

  const mpp = new MultipagePanel({
    container,
    pages,
    scrollToElement: makeContainerBar(container),
    activeIndex: getActivePageIndex(pages),
  });

  if (mpp.shouldRun()) {
    mpp.run();
  }
};

const initMultipagePanels = () => {
  [...document.querySelectorAll('[data-multipage-panel] > *')].forEach(
    initMultipagePanel
  );
};

window.addEventListener('load', initMultipagePanels);
