const { amanda, login } = require('./../record_ops/cloudant');
var bcrypt = require('bcryptjs');
var generator = require('generate-password');

function getUserData(res) {
  login.find({
    "selector": {
      "_id": {
        "$gt": "0"
      }
    }
  }, function (err, result) { res.send({ data: result.docs }) }
  )
}

module.exports = { getUserData };