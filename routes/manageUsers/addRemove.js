const { amanda, login } = require('./../record_ops/cloudant');
var bcrypt = require('bcryptjs');
var generator = require('generate-password');

const sendmail = require('sendmail')({
  smtpPort: 25,// Default: 25
  smtpHost: 'ap.replay.ibm.com'// Default: -1 - extra smtp host after resolveMX
})

var manageUsers = (req, res) => {
  var newUser = req.body.username;

  login.find({
    "selector": {
      "username": newUser
    }
  }, function (err, result) {

    if (result.docs.length > 0)
      return res.send({ STATUS: "EXISTS" });

    var passwordNew = generator.generate({
      length: 8,
      numbers: true
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(passwordNew, salt, function (err, hash) {
        if (err)
          return res.send({ STATUS: "ERROR" });

        login.insert({
          "username": newUser,
          "password": hash,
          "flag": 0,
          "disabled": "N"
        }, (err, body) => {

          if (err)
            return res.send({ STATUS: "ERROR" });
          sendMail(req, res, newUser, passwordNew);
          console.log('USER INVITED');
        })

      });
    });
  })
}

function sendMail(req, res, email, passwordNew) {

  var body = `<h3><strong>CERTIFICATE VALIDATION TOOL - Access</strong></h3>
  <hr>
  <p> Hi, </p>
  <p>A user account was provisioned to you for the Certificate Validation Tool.</p>
  <p>This is with reference to the credentials for your account.</p>
  <p>Your IBM notes ID will serve as the login ID.</p>
  <p>Password :  <span style="color:red"><strong>${passwordNew}</strong></span></p>
  <p> Click <a href= "https://still-mesa-47934.herokuapp.com/">here</a> to Log On !</p>
  <br/>
  <h6>This mail has been sent by an automation. Please do not respond.</h6>`;

  sendmail({
    from: 'no-reply@in.ibm.com',
    to: req.user.username,
    subject: 'Certification validation tool - Access',
    html: body,
  }, function (err, reply) {
    if (err)
      return res.send({ STATUS: "ERROR" });
    console.log('MAIL SENT');
    res.send({ STATUS: 'SUCCESS' })
  });

}

module.exports = { manageUsers };