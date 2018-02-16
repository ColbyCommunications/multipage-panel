const TABBABLE_ELEMENTS = 'a, area, button, object, select, textarea';

class MultipagePanel {
  static getHrefSelector(id) {
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
  }

  constructor({ container, scrollToElement, pages, activeIndex = 0 }) {
    this.allTogglers = [];
    this.container = container;
    this.pages = pages;
    this.scrollToElement = scrollToElement;
    this.activeIndex = activeIndex;
  }

  shouldRun() {
    return this.container && this.pages.length;
  }

  run() {
    this.pages.forEach(this.initPage);
    this.ensureTogglersHaveAriaAttributes();
    this.startContainerStylePing();
  }

  setContainerStyle() {
    const transform = `translate3d(-${this.activeIndex}00%, 0, 0)`;
    const height = `${this.pages[this.activeIndex].clientHeight}px`;

    if (this.container.style.transform !== transform) {
      this.container.style.transform = transform;
    }

    if (this.container.style.height !== height) {
      this.container.style.height = height;
    }
  }

  startContainerStylePing() {
    setInterval(this.setContainerStyle, 100);
  }

  deactivatePage(page) {
    page.setAttribute('aria-hidden', true);
    [...page.querySelectorAll(TABBABLE_ELEMENTS)].forEach(element => {
      element.setAttribute('tabindex', -1);
    });
  }

  deactivatePages(pages = this.pages) {
    pages.forEach(this.deactivatePage);
  }

  activatePage(page = this.pages[this.activeIndex]) {
    page.setAttribute('aria-hidden', false);
    [...page.querySelectorAll(TABBABLE_ELEMENTS)].forEach(element => {
      element.setAttribute('tabindex', 0);
    });
  }

  deactivateToggler(toggler) {
    toggler.classList.remove('active');
    toggler.setAttribute('aria-pressed', false);
  }

  deactivateTogglers(togglers) {
    togglers.forEach(this.deactivateToggler);
  }

  activateToggler(toggler) {
    toggler.classList.add('active');
    toggler.setAttribute('aria-pressed', true);
  }

  activateTogglers = togglers => {
    togglers.forEach(this.activateToggler);
  };

  handleTogglerClick({ event, i, togglers }) {
    event.preventDefault();
    this.activeIndex = i;
    this.deactivatePages();
    this.activatePage();
    this.deactivateTogglers(togglers);
    this.activateTogglers(togglers);

    history.replaceState(null, null, `#${id}`);

    if (this.scrollToElement) {
      this.scrollToElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  initPage(page, i) {
    const id = page.getAttribute('id');

    if (!id) {
      return;
    }

    const togglers = [
      ...document.querySelectorAll(MultipagePanel.getHrefSelector(id)),
    ];
    this.allTogglers = this.allTogglers.concat(togglers);

    togglers.forEach(toggler => {
      toggler.addEventListener('click', event =>
        this.handleTogglerClick({ event, i, togglers })
      );
    });
  }

  ensureTogglersHaveAriaAttributes() {
    this.allTogglers.forEach(toggler => {
      if (!toggler.hasAttribute('role')) {
        toggler.setAttribute('role', 'button');
      }

      if (!toggler.hasAttribute('aria-pressed')) {
        toggler.setAttribute('aria-pressed', false);
      }
    });
  }

  initPage = this.initPage.bind(this);
  setContainerStyle = this.setContainerStyle.bind(this);
  handleTogglerClick = this.handleTogglerClick.bind(this);
}

export default MultipagePanel;
