/**
    * @name ityped
    * @description Dead simple Animated Typing with no dependencies
    * @author Luis Vinícius
    * @email luisviniciusbarreto@gmail.com
    */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ityped = {})));
}(this, (function (exports) { 'use strict';

/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
var setProps = function setProps(_ref) {
  var _ref$strings = _ref.strings,
      strings = _ref$strings === undefined ? ['Put your strings here...', 'and Enjoy!'] : _ref$strings,
      _ref$typeSpeed = _ref.typeSpeed,
      typeSpeed = _ref$typeSpeed === undefined ? 100 : _ref$typeSpeed,
      _ref$waitDelay = _ref.waitDelay,
      waitDelay = _ref$waitDelay === undefined ? 500 : _ref$waitDelay,
      _ref$startDelay = _ref.startDelay,
      startDelay = _ref$startDelay === undefined ? 500 : _ref$startDelay,
      _ref$cursorChar = _ref.cursorChar,
      cursorChar = _ref$cursorChar === undefined ? '|' : _ref$cursorChar,
      _ref$showCursor = _ref.showCursor,
      showCursor = _ref$showCursor === undefined ? true : _ref$showCursor,
      _ref$onFinished = _ref.onFinished,
      onFinished = _ref$onFinished === undefined ? function () {} : _ref$onFinished;
  return {
    strings: strings,
    typeSpeed: typeSpeed,
    cursorChar: cursorChar,
    waitDelay: waitDelay,
    startDelay: startDelay,
    showCursor: showCursor,
    onFinished: onFinished
  };
};

var getElement = function getElement(element) {
  return typeof element === "string" ? document.querySelector(element) : element;
};

var getCursor = function getCursor(props) {
  var cursorChar = props.cursorChar;

  var cursor = document.createElement('span');
  cursor.classList.add('ityped-cursor');
  cursor.textContent = cursorChar;
  return cursor;
};

var insertCursor = function insertCursor(element, cursor, props) {
  return props.showCursor ? element.insertAdjacentElement('afterend', cursor) : null;
};

var typeString = function typeString(word, i, el, props) {
  el.innerHTML += word[i];
  if (i === word.length - 1) {
    if (isLastLetterOfLastString(word, props)) {
      return props.onFinished();
    }
    window.setTimeout(function () {
      return el.innerHTML += '<br/>';
    }, props.waitDelay);
  }
};

var isLastLetterOfLastString = function isLastLetterOfLastString(word, props) {
  return props.strings.indexOf(word) === props.strings.length - 1;
};

var writeString = function writeString(el, position, props, time) {
  var word = props.strings[position];
  var startTick = window.setTimeout(function () {
    Array.from(word).forEach(function (letter, i) {
      return setTimeout(function () {
        return typeString(word, i, el, props);
      }, props.typeSpeed * (i + 1));
    });
  }, time);
};

var start = function start(element, props) {
  var times = [];
  var strings = props.strings,
      startDelay = props.startDelay,
      typeSpeed = props.typeSpeed,
      waitDelay = props.waitDelay;

  var arrLen = strings.length;
  for (var i = 0; i < arrLen; i++) {
    var len = strings[i].length;
    var prevTime = times[i - 1] || 0;
    var nextTime = prevTime + len * typeSpeed + startDelay + waitDelay;
    times.push(nextTime);
    var time = i === 0 ? startDelay : startDelay + times[i - 1];
    writeString(element, i, props, time);
  }
};

var init = function init(el, config) {
  var props = setProps(config || {}),
      element = getElement(el);
  insertCursor(element, getCursor(props), props);
  start(element, props);
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
