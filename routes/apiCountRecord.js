const axios = require('axios');
var moment = require('moment');
moment().format();
require('dotenv').config();
const { url } = require('./bulkExports');

var simplify = data => {
  return new Promise((resolve, reject) => {
    var TOTAL_COUNT = data.total_rows;
    var SUCCESS_COUNT = 0;
    var WARNING_COUNT = 0;
    var PRE_DANGER_COUNT = 0;
    var DANGER_COUNT = 0;

    var simplify_data = data.rows.reduce((acc, x) => {
      var d1 = new moment();
      var d2 = new moment();
      var d3 = new moment();
      var d4 = new moment(x.doc.expDate, 'MM-DD-YYYY');

      d1 = d1.add(40, 'd');
      d2 = d2.add(20, 'd');
      d3 = d3.add(10, 'd');

      if (moment(d1).isSameOrBefore(d4)) SUCCESS_COUNT++;
      else if (moment(d1).isAfter(d4) && moment(d2).isSameOrBefore(d4))
        WARNING_COUNT++;
      else if (moment(d2).isAfter(d4) && moment(d3).isSameOrBefore(d4))
        PRE_DANGER_COUNT++;
      else if (moment(d3).isSameOrAfter(d4)) DANGER_COUNT++;
      return acc;
    }, []);

    resolve({
      SUCCESS_COUNT,
      WARNING_COUNT,
      PRE_DANGER_COUNT,
      DANGER_COUNT,
      TOTAL_COUNT
    });
  });
};

var interim = URL => {
  return axios
    .get(url, {
      auth: {
        username: process.env.account,
        password: process.env.password
      }
    })
    .then(res => {
      return res.data;
    });
};

var finnish = async URL => {
  try {
    var mass = await interim(URL);
    var simplify_data = await simplify(mass);
    return simplify_data;
  } catch (e) {
    return e;
  }
};

module.exports.apiCountRecord = res => {
  try {
    finnish(url)
      .then(suc => {
        res.send(suc);
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    res.send({ STATUS: 'ERROR' });
  }
};

// finnish(url, 'YELLOW')
//   .then(suc => {
//     console.log(suc);
//   })
//   .catch(e => {
//     console.log(e);
//   });
