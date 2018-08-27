const Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({ account: process.env.account, password: process.env.password });
var amanda = cloudant.db.use('dummy');
module.exports = {amanda};