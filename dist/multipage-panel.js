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
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _smoothscrollPolyfill = __webpack_require__(2);

var _smoothscrollPolyfill2 = _interopRequireDefault(_smoothscrollPolyfill);

var _MultipagePanel = __webpack_require__(8);

var _MultipagePanel2 = _interopRequireDefault(_MultipagePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

_smoothscrollPolyfill2.default.polyfill();

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

var makeContainerBar = function makeContainerBar(container) {
  var containerBar = document.createElement('DIV');
  container.parentNode.insertBefore(containerBar, container);
  return containerBar;
};

var initMultipagePanel = function initMultipagePanel(container) {
  var pages = [].concat(_toConsumableArray(document.querySelectorAll('[data-multipage-panel-page]')));

  var mpp = new _MultipagePanel2.default({
    container: container,
    pages: pages,
    scrollToElement: makeContainerBar(container),
    activeIndex: getActivePageIndex(pages)
  });

  if (mpp.shouldRun()) {
    mpp.run();
  }
};

var initMultipagePanels = function initMultipagePanels() {
  [].concat(_toConsumableArray(document.querySelectorAll('[data-multipage-panel] > *'))).forEach(initMultipagePanel);
};

window.addEventListener('load', initMultipagePanels);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* smoothscroll v0.4.0 - 2017 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   */

  var w = window;
  var d = document;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

  // polyfill
  function polyfill() {
    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null || (typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if ((typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset,
        // use top prop, second argument if present or fallback to scrollY
        arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
    };

    // w.scrollBy
    w.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value couldn\'t be converted');
        }

        original.elementScroll.call(this,
        // use left prop, first number argument or fallback to scrollLeft
        arguments[0].left !== undefined ? ~~arguments[0].left : _typeof(arguments[0]) !== 'object' ? ~~arguments[0] : this.scrollLeft,
        // use top prop, second argument or fallback to scrollTop
        arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (( false ? 'undefined' : _typeof(exports)) === 'object') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }
})();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TABBABLE_ELEMENTS = 'a, area, button, object, select, textarea';

var MultipagePanel = function () {
  _createClass(MultipagePanel, null, [{
    key: 'getHrefSelector',
    value: function getHrefSelector(id) {
      try {
        return '[href="' + window.location.origin + window.location.pathname + '#' + id + '"], [href="' + window.location.origin + window.location.pathname + '/#' + id + '"], [href="#' + id + '"]';
      } catch (e) {
        if (e.message === 'window is not defined') {
          return '[href="#' + id + '"]';
        }
      }
    }
  }]);

  function MultipagePanel(_ref) {
    var _this = this;

    var container = _ref.container,
        scrollToElement = _ref.scrollToElement,
        pages = _ref.pages,
        _ref$activeIndex = _ref.activeIndex,
        activeIndex = _ref$activeIndex === undefined ? 0 : _ref$activeIndex;

    _classCallCheck(this, MultipagePanel);

    this.activateTogglers = function (togglers) {
      togglers.forEach(_this.activateToggler);
    };

    this.initPage = this.initPage.bind(this);
    this.setContainerStyle = this.setContainerStyle.bind(this);
    this.handleTogglerClick = this.handleTogglerClick.bind(this);

    this.allTogglers = [];
    this.container = container;
    this.pages = pages;
    this.scrollToElement = scrollToElement;
    this.activeIndex = activeIndex;
  }

  _createClass(MultipagePanel, [{
    key: 'shouldRun',
    value: function shouldRun() {
      return this.container && this.pages.length;
    }
  }, {
    key: 'run',
    value: function run() {
      this.pages.forEach(this.initPage);
      this.ensureTogglersHaveAriaAttributes();
      this.startContainerStylePing();
    }
  }, {
    key: 'setContainerStyle',
    value: function setContainerStyle() {
      var transform = 'translate3d(-' + this.activeIndex + '00%, 0, 0)';
      var height = this.pages[this.activeIndex].clientHeight + 'px';

      if (this.container.style.transform !== transform) {
        this.container.style.transform = transform;
      }

      if (this.container.style.height !== height) {
        this.container.style.height = height;
      }
    }
  }, {
    key: 'startContainerStylePing',
    value: function startContainerStylePing() {
      setInterval(this.setContainerStyle, 100);
    }
  }, {
    key: 'deactivatePage',
    value: function deactivatePage(page) {
      page.setAttribute('aria-hidden', true);
      [].concat(_toConsumableArray(page.querySelectorAll(TABBABLE_ELEMENTS))).forEach(function (element) {
        element.setAttribute('tabindex', -1);
      });
    }
  }, {
    key: 'deactivatePages',
    value: function deactivatePages() {
      var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pages;

      pages.forEach(this.deactivatePage);
    }
  }, {
    key: 'activatePage',
    value: function activatePage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pages[this.activeIndex];

      page.setAttribute('aria-hidden', false);
      [].concat(_toConsumableArray(page.querySelectorAll(TABBABLE_ELEMENTS))).forEach(function (element) {
        element.setAttribute('tabindex', 0);
      });
    }
  }, {
    key: 'deactivateToggler',
    value: function deactivateToggler(toggler) {
      toggler.classList.remove('active');
      toggler.setAttribute('aria-pressed', false);
    }
  }, {
    key: 'deactivateTogglers',
    value: function deactivateTogglers(togglers) {
      togglers.forEach(this.deactivateToggler);
    }
  }, {
    key: 'activateToggler',
    value: function activateToggler(toggler) {
      toggler.classList.add('active');
      toggler.setAttribute('aria-pressed', true);
    }
  }, {
    key: 'handleTogglerClick',
    value: function handleTogglerClick(_ref2) {
      var event = _ref2.event,
          i = _ref2.i,
          togglers = _ref2.togglers;

      event.preventDefault();
      this.activeIndex = i;
      this.deactivatePages();
      this.activatePage();
      this.deactivateTogglers(togglers);
      this.activateTogglers(togglers);

      history.replaceState(null, null, '#' + id);

      if (this.scrollToElement) {
        this.scrollToElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, {
    key: 'initPage',
    value: function initPage(page, i) {
      var _this2 = this;

      var id = page.getAttribute('id');

      if (!id) {
        return;
      }

      var togglers = [].concat(_toConsumableArray(document.querySelectorAll(MultipagePanel.getHrefSelector(id))));
      this.allTogglers = this.allTogglers.concat(togglers);

      togglers.forEach(function (toggler) {
        toggler.addEventListener('click', function (event) {
          return _this2.handleTogglerClick({ event: event, i: i, togglers: togglers });
        });
      });
    }
  }, {
    key: 'ensureTogglersHaveAriaAttributes',
    value: function ensureTogglersHaveAriaAttributes() {
      this.allTogglers.forEach(function (toggler) {
        if (!toggler.hasAttribute('role')) {
          toggler.setAttribute('role', 'button');
        }

        if (!toggler.hasAttribute('aria-pressed')) {
          toggler.setAttribute('aria-pressed', false);
        }
      });
    }
  }]);

  return MultipagePanel;
}();

exports.default = MultipagePanel;

/***/ })
/******/ ]);
//# sourceMappingURL=multipage-panel.js.map