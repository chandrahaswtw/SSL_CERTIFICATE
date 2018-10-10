const { amanda, login } = require('./../record_ops/cloudant');
var bcrypt = require('bcryptjs');

var changePassword = (req, res) => {
  currentPwd = req.body.CURRENT;
  newPwd = req.body.NEW;
  username = req.user.username;

  login.find({
    "selector": {
      "username": username
    }
  }, function (err, result) {
    var id = (result.docs)[0]._id;
    var rev = (result.docs)[0]._rev;

    bcrypt.compare(currentPwd, (result.docs)[0].password, function (err, cur_res) {
      if (!cur_res) {
        console.log('PASSWORD MISMATCH');
        return res.send({ STATUS: 'MISMATCH' });
      }

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newPwd, salt, function (err, hash) {
          login.insert({
            "_id": id,
            "_rev": rev,
            "username": username,
            "password": hash,
            "flag": 1,
            "disabled": "N"
          }, (err, body) => {
            console.log('PASSWORD UPDATED')
            res.send({ STATUS: 'SUCCESS' })
          })

        });
      });


    });
  })

}

var changePasswordLogin = (req, res) => {

  login.find({
    "selector": {
      "username": req.body.username
    }
  }, function (err, result) {
    var id = (result.docs)[0]._id;
    var rev = (result.docs)[0]._rev;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        login.insert({
          "_id": id,
          "_rev": rev,
          "username": req.body.username,
          "password": hash,
          "flag": 1,
          "disabled": "N"
        }, (err, body) => {
          console.log('PASSWORD UPDATED')
          res.send({ STATUS: 'SUCCESS' })
        })

      });
    });

  })


}

module.exports = { changePassword, changePasswordLogin }