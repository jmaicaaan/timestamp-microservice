'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _intro = require('./intro/intro.handler');

Object.keys(_intro).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _intro[key];
    }
  });
});

var _timestamp = require('./timestamp/timestamp.handler');

Object.keys(_timestamp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _timestamp[key];
    }
  });
});