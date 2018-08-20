
// // function add (data) {
// //  var y = data.reduce(function(acc, x) {
// //      acc[`${x.name}`] = x.value;
// //    return acc;
// //    }, {});
// // }



// // add(  [ { name: 'portfolioName', value: '' },
// //       { name: 'appName', value: '' },
// //       { name: 'appId', value: '' },
// //       { name: 'envName', value: '' },
// //       { name: 'SSLCertName', value: '' },
// //       { name: 'expDate', value: '' },
// //       { name: 'serverName', value: '' },
// //       { name: 'PrimaryName', value: '' },
// //       { name: 'PrimaryEmail', value: '' },
// //       { name: 'PrimaryPhone', value: '' },
// //       { name: 'SecondaryName', value: '' },
// //       { name: 'SecondaryEmail', value: '' },
// //       { name: 'SecondaryPhone', value: '' },
// //       { name: 'alertMech', value: '' },
// //       { name: 'alertToolName', value: '' },
// //       { name: 'Threshold', value: '' },
// //       { name: 'lastTriggerDate', value: '' },
// //       { name: 'Remarks', value: '' } ] );

// const Cloudant = require('@cloudant/cloudant');
// require('dotenv').config();
// var cloudant = Cloudant({account:process.env.account, password:process.env.password});
// var amanda = cloudant.db.use('dummy');

// amanda.find({
//   "selector": {
//      "_id": {
//         "$gt": "0"
//      },
//      "appName": "SMART"
//   },
//   "fields": [
//      "appName",
//      "_rev",
//      "appName"
//   ],
//   "sort": [
//      {
//         "_id": "asc"
//      }
//   ]
// },function(err,result) {console.log(result.docs)}
// )
const path = require('path');

console.log(static_files + 'add.html');