/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TABBABLE_ELEMENTS = 'a, area, button, object, select, textarea';
var allTogglers = [];

var setContainerStyles = function setContainerStyles(_ref) {
  var container = _ref.container,
      page = _ref.page,
      i = _ref.i;

  container.style.transform = 'translate3d(-' + i + '00%, 0, 0)';
  container.style.height = page.clientHeight + 'px';
};

var deactivateTogglers = function deactivateTogglers() {
  var togglers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : allTogglers;

  togglers.forEach(function (toggler) {
    toggler.classList.remove('active');
    toggler.setAttribute('aria-pressed', false);
  });
};

var activateTogglers = function activateTogglers(togglers) {
  togglers.forEach(function (toggler) {
    toggler.classList.add('active');
    toggler.setAttribute('aria-pressed', true);
  });
};

var ensureTogglerAria = function ensureTogglerAria(togglers) {
  togglers.forEach(function (toggler) {
    if (!toggler.hasAttribute('role')) {
      toggler.setAttribute('role', 'button');
    }

    if (!toggler.hasAttribute('aria-pressed')) {
      toggler.setAttribute('aria-pressed', false);
    }
  });
};

var deactivatePages = function deactivatePages(pages) {
  pages.forEach(function (page) {
    page.setAttribute('aria-hidden', true);
    [].concat(_toConsumableArray(page.querySelectorAll(TABBABLE_ELEMENTS))).forEach(function (element) {
      element.setAttribute('tabindex', -1);
    });
  });
};

var activatePage = function activatePage(page) {
  page.setAttribute('aria-hidden', false);
  [].concat(_toConsumableArray(page.querySelectorAll(TABBABLE_ELEMENTS))).forEach(function (element) {
    element.setAttribute('tabindex', 0);
  });
};

var getHrefSelector = function getHrefSelector(id) {
  try {
    return '[href="' + window.location.href + '#' + id + '"], [href="' + window.location.href + '/#' + id + '"], [href="#' + id + '"]';
  } catch (e) {
    return '[href="#' + id + '"]';
  }
};

var initPage = function initPage(_ref2) {
  var i = _ref2.i,
      pages = _ref2.pages,
      page = _ref2.page,
      container = _ref2.container,
      activePageIndex = _ref2.activePageIndex;

  var id = page.getAttribute('id');

  if (!id) {
    return;
  }

  var togglers = [].concat(_toConsumableArray(document.querySelectorAll(getHrefSelector(id))));
  allTogglers = allTogglers.concat(togglers);
  ensureTogglerAria(togglers);

  // Run setup for initial state -- the first page is active.
  if (i === activePageIndex) {
    setContainerStyles({ container: container, page: page, i: i });
    activateTogglers(togglers);
    deactivatePages(pages);
    activatePage(page);
  }

  togglers.forEach(function (toggler) {
    toggler.addEventListener('click', function (event) {
      event.preventDefault();
      setContainerStyles({ container: container, page: page, i: i });
      deactivatePages(pages);
      activatePage(page);
      deactivateTogglers();
      activateTogglers(togglers);
      history.replaceState(null, null, '#' + id);
    });
  });
};

var getPageHash = function getPageHash() {
  try {
    return window.location.hash;
  } catch (e) {
    return '';
  }
};

var getActivePageIndex = function getActivePageIndex(pages) {
  var hash = getPageHash();
  if (hash === '') {
    return 0;
  }

  for (var i = 0; i < pages.length; i += 1) {
    var id = pages[i].getAttribute('id');
    if (hash === '#' + id) {
      return i;
    }
  }

  return 0;
};

var initMultipagePanel = function initMultipagePanel(container) {
  var pages = [].concat(_toConsumableArray(document.querySelectorAll('[data-multipage-panel-page]')));

  var activePageIndex = getActivePageIndex(pages);
  pages.forEach(function (page, i) {
    initPage({ i: i, page: page, pages: pages, container: container, activePageIndex: activePageIndex });
  });
};

var initMultipagePanels = function initMultipagePanels() {
  [].concat(_toConsumableArray(document.querySelectorAll('[data-multipage-panel] > *'))).forEach(initMultipagePanel);
};

window.addEventListener('load', initMultipagePanels);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=multipage-panel.js.map