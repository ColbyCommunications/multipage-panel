import smoothscrollPolyfill from 'smoothscroll-polyfill';

smoothscrollPolyfill.polyfill();

const TABBABLE_ELEMENTS = 'a, area, button, object, select, textarea';
let allTogglers = [];

const setContainerStyles = ({ container, page, i }) => {
  container.style.transform = `translate3d(-${i}00%, 0, 0)`;
  container.style.height = `${page.clientHeight}px`;
};

const deactivateTogglers = (togglers = allTogglers) => {
  togglers.forEach(toggler => {
    toggler.classList.remove('active');
    toggler.setAttribute('aria-pressed', false);
  });
};

const activateTogglers = togglers => {
  togglers.forEach(toggler => {
    toggler.classList.add('active');
    toggler.setAttribute('aria-pressed', true);
  });
};

const ensureTogglerAria = togglers => {
  togglers.forEach(toggler => {
    if (!toggler.hasAttribute('role')) {
      toggler.setAttribute('role', 'button');
    }

    if (!toggler.hasAttribute('aria-pressed')) {
      toggler.setAttribute('aria-pressed', false);
    }
  });
};

const deactivatePages = pages => {
  pages.forEach(page => {
    page.setAttribute('aria-hidden', true);
    [...page.querySelectorAll(TABBABLE_ELEMENTS)].forEach(element => {
      element.setAttribute('tabindex', -1);
    });
  });
};

const activatePage = page => {
  page.setAttribute('aria-hidden', false);
  [...page.querySelectorAll(TABBABLE_ELEMENTS)].forEach(element => {
    element.setAttribute('tabindex', 0);
  });
};

const getHrefSelector = id => {
  try {
    return `[href="${window.location.origin}${
      window.location.pathname
    }#${id}"], [href="${window.location.origin}${
      window.location.pathname
    }/#${id}"], [href="#${id}"]`;
  } catch (e) {
    if (e.message === 'window is not defined') {
      return `[href="#${id}"]`;
    }
  }
};

const initPage = ({
  i,
  pages,
  page,
  container,
  containerBar,
  activePageIndex,
}) => {
  const id = page.getAttribute('id');

  if (!id) {
    return;
  }

  const togglers = [...document.querySelectorAll(getHrefSelector(id))];
  console.log(togglers);
  allTogglers = allTogglers.concat(togglers);
  ensureTogglerAria(togglers);

  // Run setup for initial state -- the first page is active.
  if (i === activePageIndex) {
    setContainerStyles({ container, page, i });
    activateTogglers(togglers);
    deactivatePages(pages);
    activatePage(page);
  }

  togglers.forEach(toggler => {
    toggler.addEventListener('click', event => {
      event.preventDefault();
      setContainerStyles({ container, page, i });
      deactivatePages(pages);
      activatePage(page);
      deactivateTogglers();
      activateTogglers(togglers);
      history.replaceState(null, null, `#${id}`);
      containerBar.scrollIntoView({ behavior: 'smooth' });
    });
  });
};

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
  const containerBar = makeContainerBar(container);
  const pages = [...document.querySelectorAll('[data-multipage-panel-page]')];

  const activePageIndex = getActivePageIndex(pages);
  pages.forEach((page, i) => {
    initPage({ i, page, pages, container, activePageIndex, containerBar });
  });
};

const initMultipagePanels = () => {
  [...document.querySelectorAll('[data-multipage-panel] > *')].forEach(
    initMultipagePanel
  );
};

window.addEventListener('load', initMultipagePanels);
