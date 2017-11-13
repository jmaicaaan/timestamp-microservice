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
    naturalDate += ' 00:00:00 +0000';
    var unix = Date.parse(naturalDate) / 1000;
    return { unix: unix, naturalDate: getFormattedNaturalDate(new Date(naturalDate)) };
  }
  throw 'Invalid date';
}

function getFormattedNaturalDate(date) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (date && (typeof date === 'undefined' ? 'undefined' : _typeof(date)) === 'object') {
    var dateMonth = months[date.getUTCMonth()];
    var dateDay = date.getUTCDate();
    var dateYear = date.getUTCFullYear();
    if (!dateMonth || !dateDay || !dateYear) {
      throw 'Invalid date';
    }
    var x = [dateMonth, dateDay + ',', dateYear].join(' ');
    return x;
  }
  throw 'Invalid date';
}

exports.timestampHandler = timestampHandler;