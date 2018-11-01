const { amanda, login, mailLog } = require('./../record_ops/cloudant');
var moment = require('moment');
moment().format();

var remarkUpdate = (bulkArray) => {

  var filtered = bulkArray.map((e) => {
    var msg = "";
    if (e.remarks)
      msg = `${e.remarks}\n`
    e.remarks = `${msg}${new moment().format('MM-DD-YYYY HH:mm:ss')} : Alert Mail was triggered to both primary and secondary`;
    return e;
  })


  amanda.bulk({ docs: filtered }, (err, res) => { console.log("RECORDS UPDATED") });

}




module.exports = { remarkUpdate };