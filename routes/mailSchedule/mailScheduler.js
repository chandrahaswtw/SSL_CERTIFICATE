var schedule = require('node-schedule');
//require('dotenv').config();
const { amanda, login, mailLog } = require('./../record_ops/cloudant');
const { zonify } = require('./dividir');
const { bulkMailTrig } = require('./bulkMail');

var j = schedule.scheduleJob('0 15 16 * * *', function () {
  console.log('SCHEDULER BEGIN');
  x();
});


// FETCH ALL RECORD DATA
var allData = new Promise((resolve, reject) => {
  amanda.find({
    "selector": {
      "_id": {
        "$gt": "0"
      }
    }
  }, function (err, result) { resolve(result.docs) }
  )
})


// FETCH ALL YELLOW ZONE DATA DATA
var yellowMail = new Promise((resolve, reject) => {
  mailLog.find({
    "selector": {
      "_id": {
        "$gt": "0"
      },
      "zone": "YELLOW"
    }
  }, function (err, result) { resolve(result.docs[0].mailData) }
  )
})

// FETCH ALL ORANGE ZONE DATA DATA
var orangeMail = new Promise((resolve, reject) => {
  mailLog.find({
    "selector": {
      "_id": {
        "$gt": "0"
      },
      "zone": "ORANGE"
    }
  }, function (err, result) { resolve(result.docs[0].mailData) }
  )
})


var x = async () => {
  [a, b, c] = await Promise.all([allData, yellowMail, orangeMail])
  var filtrer = await zonify(a, b, c);
  bulkMailTrig(filtrer);
}

module.exports = j;









