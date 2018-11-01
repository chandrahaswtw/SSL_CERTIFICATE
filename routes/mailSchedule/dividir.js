var moment = require('moment');
moment().format();
var { days2expire } = require('./../statusMail/days2expire');

var zonify = (allData, yellowMail, orangeMail) => {
  return new Promise((resolve, reject) => {

    var yellowArray = [];
    var orangeArray = [];
    var redArray = [];

    var d1 = new moment();
    var d2 = new moment();
    var d3 = new moment();
    d1 = d1.add(40, 'd');
    d2 = d2.add(20, 'd');
    d3 = d3.add(10, 'd');

    allData.forEach(e => {

      if (moment(e.expDate, 'MM-DD-YYYY').isValid() && e.alertMech) {

        var d4 = new moment(e.expDate, 'MM-DD-YYYY');

        if (moment(d1).isAfter(d4) && moment(d2).isSameOrBefore(d4)) {
          if (yellowMail.length > 0) {
            yellowMail.forEach(element => {

              if (((element.appId != e.appId) && (element.serverName == e.serverName)) && ((Math.abs(days2expire(element.trigDate)) > 20) || e.alertMech == 'on')) { yellowArray.push(e); }

            });
          }
          else if (e.alertMech == 'on')
            yellowArray.push(e);
        }

        else if (moment(d2).isAfter(d4) && moment(d3).isSameOrBefore(d4)) {
          if (orangeMail.length > 0) {
            orangeMail.forEach(element => {
              if (((element.appId != e.appId) && (element.serverName == e.serverName)) && ((Math.abs(days2expire(element.trigDate)) > 10) || e.alertMech == 'on')) { orangeMail.push(e); }
            });
          }
          else if (e.alertMech == 'on')
            orangeArray.push(e);
        }

        else if (moment(d3).isSameOrAfter(d4)) {
          if (e.alertMech == 'on')
            redArray.push(e);
        }
      }

    });


    resolve({
      yellowArray, orangeArray, redArray
    })

  });
};

module.exports = { zonify };