const { amanda } = require('./cloudant');

var query = {
  selector: {
    _id: {
      $gt: '0'
    }
  },
  sort: [
    {
      _id: 'asc'
    }
  ]
};

var fetchAll = res => {
  amanda.find(query, (err, result) => {
    res.send({ ALL_RECORDS: result.docs });
  });
};

module.exports = { fetchAll };
