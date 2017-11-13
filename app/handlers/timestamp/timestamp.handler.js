function timestampHandler(req, res) {
  let date = req.query.date;
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
  let unixDateLen = unixDate.toString();
  if (!isNaN(unixDate) && unixDateLen.length <= 10) {
    let naturalDate = new Date(unixDate * 1000);
    return { unix: unixDate, naturalDate: getFormattedNaturalDate(naturalDate) };
  }
  throw 'Passed parameter date is not a number'
}

function naturalDateToUnix(naturalDate) {
  if (isNaN(naturalDate) && Date.parse(naturalDate)) {
    naturalDate += ' 00:00:00 +0000'
    let unix = Date.parse(naturalDate) / 1000;
    return { unix, naturalDate: getFormattedNaturalDate(new Date(naturalDate)) };
  }
  throw 'Invalid date';
}

function getFormattedNaturalDate(date) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  if (date && typeof date === 'object') {
    let dateMonth = months[date.getUTCMonth()];
    let dateDay = date.getUTCDate();
    let dateYear = date.getUTCFullYear();
    if (!dateMonth || !dateDay || !dateYear) {
      throw 'Invalid date';
    }
    let x = [dateMonth, dateDay + ',', dateYear].join(' ');
    return x;
  }
  throw 'Invalid date';
}

export { timestampHandler } 