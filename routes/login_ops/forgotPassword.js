const { amanda, login } = require('./../record_ops/cloudant');
var bcrypt = require('bcryptjs');
var generator = require('generate-password');

const sendmail = require('sendmail')({
  smtpPort: 25,// Default: 25
  smtpHost: 'ap.replay.ibm.com'// Default: -1 - extra smtp host after resolveMX
})

var forgotPassword = (req, res) => {
  login.find({
    "selector": {
      "username": req.body.username
    }
  }, function (err, result) {

    if (result.docs.length == 0)
      return res.send({ STATUS: "NO_USERNAME" });

    var id = (result.docs)[0]._id;
    var rev = (result.docs)[0]._rev;

    var passwordNew = generator.generate({
      length: 8,
      numbers: true
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(passwordNew, salt, function (err, hash) {
        if (err)
          return res.send({ STATUS: "ERROR" });

        login.insert({
          "_id": id,
          "_rev": rev,
          "username": req.body.username,
          "password": hash,
          "flag": 0,
          "disabled": "N"
        }, (err, body) => {

          if (err)
            return res.send({ STATUS: "ERROR" });
          sendMail(res, req.body.username, passwordNew);
          console.log('PASSWORD RESETTED')
        })

      });
    });


  })
}


function sendMail(res, email, passwordNew) {

  var body = `<h3><strong>CERTIFICATE VALIDATION TOOL - Password reset</strong></h3>
  <hr>
  <p>Hi,</p> 
  <p>The password for your Certificate Validation Tool Account was successfully changed.</p>
  <p> Your new password is : <span style="color:red"><strong>${passwordNew}</strong></span></p>
  <p> Click <a href= "https://still-mesa-47934.herokuapp.com/">here</a> to Log On !</p>
  <br/>
  <h6>This mail was system generated. Please do not respond.</h6>`

  sendmail({
    from: 'no-reply@in.ibm.com',
    to: email,
    subject: 'Certificate validation tool - Password reset',
    html: body,
  }, function (err, reply) {
    if (err)
      return res.send({ STATUS: "ERROR" });
    console.log('MAIL SENT');
    res.send({ STATUS: 'SUCCESS' })
  });

}

module.exports = { forgotPassword };