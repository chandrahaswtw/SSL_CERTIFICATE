const { amanda } = require('./../record_ops/cloudant');

var syncData = (res, data) => {
  amanda.bulk({ docs: data }, function (er) {
    if (er) {
      return res.send({ STATUS: 'ERROR' });
    }

    console.log('Inserted all documents');
    res.send({ STATUS: 'SUCCESS', NUM: data.length });
  });
}






module.exports = { syncData };