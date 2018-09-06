const { amanda } = require('./cloudant');
const { apiDateSearch } = require('./apiDateSearch');
const { fetchAll } = require('./fetchAll');
const { unify } = require('./bulkExports');


function cloudant_query(PARAM1, PARAM2) {

    return {
        "selector": {
            "_id": {
                "$gt": "0"
            },
            [`${PARAM1}`]: `${PARAM2}`
        },

        "sort": [
            {
                "_id": "asc"
            }
        ]
    };

}

var searchRecord = (details, res) => {
    try {
        var x = unify(details.input);
        Object.keys(x).forEach((e) => {
            if (!x[`${e}`])
                delete x[`${e}`]
        })

        if (x[Object.keys(x)[0]] == 'expDate') {
            apiDateSearch(x[Object.keys(x)[1]], res)
        }
        else if (x[Object.keys(x)[0]] == 'all') {
            fetchAll(res);
        }
        else {
            amanda.find(cloudant_query(x[Object.keys(x)[0]], x[Object.keys(x)[1]]), (err, result) => {
                res.send({ ALL_RECORDS: result.docs });
            });

        }
    }
    catch (e) {
        res.send({ status: "ERROR" });
    }
}

module.exports = { searchRecord };


