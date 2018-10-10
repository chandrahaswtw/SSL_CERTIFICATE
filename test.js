// SEND MAIL
const sendmail = require('sendmail')({
  smtpPort: 25,// Default: 25
  smtpHost: 'ap.replay.ibm.com'// Default: -1 - extra smtp host after resolveMX
})

var body = "<h3><strong>CERTIFICATION VALIDATION TOOL</strong></h3><h4>You have successfully changed your <strong>Certificate Validation Tool</strong> password ! </h4><p>Hi,</p> <p>The password for your Certification Validation Tool Account was successfully changed.</p><p> Your new password is -                          </p><p> Click <a href= \"http://www.google.com\">here</a> to Log On !</p><h6>This mail was system generated. Please do not respond.</h6>"

sendmail({
  from: 'no-reply@in.ibm.com',
  to: 'cballeda@in.ibm.com',
  subject: 'PASSWORD RESET',
  html: body,
}, function (err, reply) {
  if (err)
    return console.log('INTERNAL ERROR');
  console.log('MAIL SENT');
});
