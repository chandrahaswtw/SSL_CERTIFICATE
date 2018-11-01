const { amanda, login, mailLog } = require('./../record_ops/cloudant');
var moment = require('moment');
moment().format();


function mailLogUpdate(yellowArray, orangeArray, redArray) {

  var yellowArray_new = yellowArray.map((e) => {
    return { appId: e.appId, serverName: e.serverName, trigDate: new moment().format('MM-DD-YYYY') }
  })

  var orangeArray_new = orangeArray.map((e) => {
    return { appId: e.appId, serverName: e.serverName, trigDate: new moment().format('MM-DD-YYYY') }
  })

  var redArray_new = redArray.map((e) => {
    return { appId: e.appId, serverName: e.serverName, trigDate: new moment().format('MM-DD-YYYY') }
  })

  mailLog.find({
    "selector": {
      "_id": {
        "$gt": "0"
      },
      "zone": "YELLOW"
    }
  }, function (err, result) {
    mailLog.insert({
      "_id": result.docs[0]._id,
      "_rev": result.docs[0]._rev,
      "zone": "YELLOW",
      "mailData": [...result.docs[0].mailData, ...yellowArray_new]
    }, (err, body) => { console.log("YELLOW UPDATED") })
  }
  )

  mailLog.find({
    "selector": {
      "_id": {
        "$gt": "0"
      },
      "zone": "ORANGE"
    }
  }, function (err, result) {
    mailLog.insert({
      "_id": result.docs[0]._id,
      "_rev": result.docs[0]._rev,
      "zone": "ORANGE",
      "mailData": [...result.docs[0].mailData, ...orangeArray_new]
    }, (err, body) => { console.log("ORANGE UPDATED") })
  }
  )

  mailLog.find({
    "selector": {
      "_id": {
        "$gt": "0"
      },
      "zone": "RED"
    }
  }, function (err, result) {
    mailLog.insert({
      "_id": result.docs[0]._id,
      "_rev": result.docs[0]._rev,
      "zone": "RED",
      "mailData": [...result.docs[0].mailData, ...redArray_new]
    }, (err, body) => { console.log("RED UPDATED") })
  }
  )
}

module.exports = { mailLogUpdate }