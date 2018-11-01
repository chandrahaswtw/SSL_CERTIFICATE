const { amanda } = require('./cloudant');
const { unify } = require('./bulkExports');
var moment = require('moment');
moment().format();

function modalUpdate(details, res) {

  var x = unify(details.input);

  var absolute = new Promise((resolve, reject) => {
    amanda.find({
      "selector": {
        "_id": {
          "$gt": "0"
        },
        "_id": x._id
      }
    }, function (err, result) { resolve(result.docs[0]) }
    )
  })

  absolute.then((ab) => {
    if (ab.remarks && ab.remarks.length > 0)
      return ab.remarks;
    else return '';
  })
    .then((ab) => {
      if (x.remarks.length > 0)
        x.remarks = `${ab}\n${new moment().format('MM-DD-YYYY HH:mm:ss')} : ${x.remarks}`
      else
        x.remarks = ab;
      return x;
    }).then((ab) => {
      amanda.insert(ab, (err, body) => {
        if (err) {
          console.log(err);
          return res.send({ status: "ERROR" });
        }
        res.send({ status: "OK", _rev: body.rev });
      })
    }).catch((e) => {
      return res.send({ status: "ERROR" });
    })


}

module.exports = { modalUpdate };