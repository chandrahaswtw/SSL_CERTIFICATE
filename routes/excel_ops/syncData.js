const { amanda, mailLog } = require('./../record_ops/cloudant');
var moment = require('moment');
moment().format();

var syncData = (res, data) => {

  //FETCHING ALL DATA
  var absolute = new Promise((resolve, reject) => {
    amanda.find({
      "selector": {
        "_id": {
          "$gt": "0"
        }
      }
    }, function (err, result) { resolve(result.docs) }
    )
  })

  absolute.then((db) => {

    var filtered = data.reduce((acc, cur) => {

      if (Object.keys(cur).includes('appId') && Object.keys(cur).includes('serverName') && Object.keys(cur).includes('primaryEmail')) {

        if (cur.appId.length == 0 || cur.serverName.length == 0 || cur.primaryEmail.length == 0)
          return acc;

        for (let i of db) {
          if (i.appId == cur.appId && i.serverName == cur.serverName) {
            return acc;
          }
        }
        if (Object.keys(cur).includes('remarks') && (cur.remarks).length > 0)
          cur.remarks = `${new moment().format('MM-DD-YYYY HH:mm:ss')} : ${cur.remarks}`

        cur.appId = (cur.appId).toUpperCase();
        cur.appName = (cur.appId).toUpperCase();
        cur.serverName = (cur.serverName).toUpperCase();
        cur.primaryEmail = (cur.primaryEmail).toLowerCase();
        if (Object.keys(cur).includes('secondaryEmail'))
          cur.secondaryEmail = (cur.secondaryEmail).toLowerCase();

        acc.push(cur);
      }
      return acc;
    }, [])

    return filtered;
  })
    .then((filtered) => {

      //console.log(filtered);
      if (filtered.length == 0)
        res.send({ STATUS: 'SUCCESS', NUM: 0 });
      else {
        amanda.bulk({ docs: filtered }, function (er) {
          if (er) {
            console.log(er);
            return res.send({ STATUS: 'ERROR' });
          }
          console.log('Inserted all documents');
          res.send({ STATUS: 'SUCCESS', NUM: filtered.length });
        });
      }
    })
    .catch((e) => {
      res.send({ STATUS: 'ERROR' });
    })


}

module.exports = { syncData };