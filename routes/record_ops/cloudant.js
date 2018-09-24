const Cloudant = require('@cloudant/cloudant');
require('dotenv').config();
var cloudant = Cloudant({ account: process.env.account, password: process.env.password });
var amanda = cloudant.db.use('dummy');
module.exports = { amanda };