const { amanda } = require('./cloudant');

function cloudant_query(ID) {
  return query = {
    selector: {
      _id: {
        $gt: '0'
      },
      _id: `${ID}`
    },
    sort: [
      {
        _id: 'asc'
      }
    ]
  };
}

var modalView = (ID, res) => {
  amanda.find(cloudant_query(ID), (err, result) => {
    res.send({ ALL_RECORDS: result.docs });
  });
};

module.exports = { modalView };
