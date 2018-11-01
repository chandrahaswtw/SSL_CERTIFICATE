const Cloudant = require('@cloudant/cloudant');
require('dotenv').config();
var cloudant = Cloudant({ account: process.env.account, password: process.env.password });
var amanda = cloudant.db.use('cvt_records');
var login = cloudant.db.use('login');
var mailLog = cloudant.db.use('mail_log');
module.exports = { amanda, login, mailLog };
