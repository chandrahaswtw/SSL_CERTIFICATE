const { amanda, login } = require('./../record_ops/cloudant');
var bcrypt = require('bcryptjs');
var generator = require('generate-password');
var { days2expire } = require('./days2expire');

const sendmail = require('sendmail')({
  smtpPort: 25,// Default: 25
  smtpHost: 'ap.replay.ibm.com'// Default: -1 - extra smtp host after resolveMX
})

function indMailTrig(req, res) {

  amanda.find({
    "selector": {
      "_id": {
        "$gt": "0"
      },
      "_id": req.body.idtemp
    }
  }, function (err, result) {

    if (err)
      return res.send({ STATUS: "ERROR" });
    x = result.docs[0];

    // DEFINING HTML
    var html =
      `<h3><strong>CERTIFICATE VALIDATION TOOL - Certificate Status</strong></h3>
        <hr>
        <p>Hi,</p> 
        <p>Please find the below details for the <strong>${x.appId} : ${x.appName}</strong></p>

        <table>
        <tr>
          <td><strong>App ID</strong></td>
        <td></td>
          <td>${x.appId}</td>
        </tr>
        <tr>
          <td><strong>App name</strong></td>
        <td></td>
          <td>${x.appName}</td>
        </tr>
        <tr>
          <td><strong>Server</strong></td>
        <td></td>
          <td>${x.serverName}</td>
        </tr>
        <tr>
          <td><strong>Certificate name</strong></td>
        <td></td>
          <td>${x.certName}</td>
        </tr>
        <tr>
          <td><strong>Certificate expiry date(MM/DD/YYYY)</strong></td>
        <td></td>
          <td>${x.expDate}</td>
        </tr>
        <tr>
          <td><strong>Environment</strong></td>
        <td></td>
          <td>${x.envName}</td>
        </tr>
        <tr>
          <td><strong>Days to expiration</strong></td>
        <td></td>
          <td>${days2expire(x.expDate)}</td>
        </tr>
      </table>

      <p> Click <a href= "https://still-mesa-47934.herokuapp.com/">here</a> and login to browse more details</p>
      <h6>This mail was system generated. Please do not respond.</h6>`

    sendMail(req, res, x, html);

  }
  )


}


function sendMail(req, res, x, html) {

  var prim = x.primaryEmail;

  if (!x.primaryEmail)
    return res.send({ STATUS: "MISSING" })

  if (x.secondaryEmail)
    var sec = `, ${x.secondaryEmail}`;
  else
    var sec = "";

  sendmail({
    from: 'no-reply@in.ibm.com',
    to: `${prim}${sec}`,
    subject: 'Certificate validation tool - Certificate Status',
    html: html,
  }, function (err, reply) {
    if (err)
      return res.send({ STATUS: "ERROR" });
    else {
      console.log('MAIL SENT');
      res.send({ STATUS: 'SUCCESS' });
    }
  });

}

module.exports = { indMailTrig };