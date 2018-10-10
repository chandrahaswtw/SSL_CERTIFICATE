const { amanda } = require('./../record_ops/cloudant');

var syncData = (res, data) => {

  var y = [];
  Object.keys(data).forEach((e) => {
    y.push((data[`${e}`]));
  })

  amanda.bulk({ docs: y }, function (er) {
    if (er) {
      console.log(er);
      return res.send({ STATUS: 'ERROR' });
    }

    console.log('Inserted all documents');
    res.send({ STATUS: 'SUCCESS', NUM: y.length });
  });
}

module.exports = { syncData };