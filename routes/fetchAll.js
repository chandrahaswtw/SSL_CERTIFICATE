const {amanda} = require('./cloudant');

var query = {
    "selector": {
        "_id": {
            "$gt": "0"
        }
    },
    "fields": [
        "_id",
        "appId",
        "appName",
        "serverName",
        "expDate",
        "thresholdDays"
    ],
    "sort": [
        {
            "_id": "asc"
        }
    ]
};

var fetchAll = (res) => {
    amanda.find(query, (err, result) => {   //console.log(result.docs);
        res.send({ ALL_RECORDS: result.docs });
    });
}

module.exports = {fetchAll};









