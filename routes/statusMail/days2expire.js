var moment = require('moment');
moment().format();

function days2expire(expDate) {

  var d1 = new moment(expDate, 'MM-DD-YYYY');
  var d2 = new moment();

  return d1.diff(d2, 'd')

}

module.exports = { days2expire };