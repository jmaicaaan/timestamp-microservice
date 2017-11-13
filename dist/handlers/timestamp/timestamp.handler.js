'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function timestampHandler(req, res) {
  var date = req.query.date;
  if (date) {
    if (!isNaN(date)) {
      res.send(unixToNaturalDate(date));
      return;
    } else {
      res.send(naturalDateToUnix(date));
      return;
    }
  }
  throw 'No passed date parameter';
}

function unixToNaturalDate(unixDate) {
  var unixDateLen = unixDate.toString();
  if (!isNaN(unixDate) && unixDateLen.length <= 10) {
    var naturalDate = new Date(unixDate * 1000);
    return { unix: unixDate, naturalDate: getFormattedNaturalDate(naturalDate) };
  }
  throw 'Passed parameter date is not a number';
}

function naturalDateToUnix(naturalDate) {
  if (isNaN(naturalDate) && Date.parse(naturalDate)) {
    var unix = Date.parse(naturalDate) / 1000;
    return { unix: unix, naturalDate: naturalDate };
  }
  throw 'Invalid date';
}

function getFormattedNaturalDate(date) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (date && (typeof date === 'undefined' ? 'undefined' : _typeof(date)) === 'object') {
    var dateMonth = months[date.getMonth()];
    var dateDay = date.getDate();
    var dateYear = date.getFullYear();
    if (!dateMonth || !dateDay || !dateYear) {
      throw 'Invalid date';
    }
    return [dateMonth, dateDay + ',', dateYear].join(' ');
  }
  throw 'Invalid date';
}

exports.timestampHandler = timestampHandler;