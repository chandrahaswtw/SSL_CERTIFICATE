var { days2expire } = require('./../statusMail/days2expire');
const { mailLogUpdate } = require('./mailLogUpdate');
const { remarkUpdate } = require('./remarkUpdate');
var moment = require('moment');
moment().format();

const sendmail = require('sendmail')({
  smtpPort: 25,// Default: 25
  smtpHost: 'ap.replay.ibm.com'// Default: -1 - extra smtp host after resolveMX
})


function htmlGen(x) {

  var days = days2expire(x.expDate)
  var html =
    `<h3><strong>CERTIFICATE VALIDATION TOOL - Certificate Status</strong></h3>
    <hr>
      <p>Hi,</p>
      <p>Server certificate for the below expires in <strong>${days}</strong> days. Take immediate action !!. <br/></p>

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
          <td><strong>Certificate expiry date (MM/DD/YYYY)</strong></td>
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
          <td>${days}</td>
        </tr>
      </table>

      <h6>This mail was system generated. Please do not respond.</h6>`

  return html;

}

function sendMail(x, html) {

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
      console.log('INTERNAL ERROR');
    else {
      console.log('MAIL SENT');
    }
  });

}

var mailBase = (yellowArray, orangeArray, redArray) => {

  for (let element of [...yellowArray, ...orangeArray, ...redArray]) {
    mailId = {
      primaryEmail: element.primaryEmail,
      secondaryEmail: element.secondaryEmail
    };
    sendMail(mailId, htmlGen(element));
  }

}



var bulkMailTrig = (filtrer) => {

  var { yellowArray } = filtrer;
  var { orangeArray } = filtrer;
  var { redArray } = filtrer;

  mailBase(yellowArray, orangeArray, redArray);
  mailLogUpdate(yellowArray, orangeArray, redArray);
  remarkUpdate([...yellowArray, ...orangeArray, ...redArray]);

}

module.exports = { bulkMailTrig };