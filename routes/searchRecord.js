const {amanda} = require('./cloudant');
const {apiDateSearch} = require('./apiDateSearch');
const {unify} = require('./bulkExports');


function cloudant_query(PARAM1, PARAM2) {
    if (PARAM1 == 'all')
        return {
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

    else
        return {
            "selector": {
                "_id": {
                    "$gt": "0"
                },
                [`${PARAM1}`]: `${PARAM2}`
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

}

var searchRecord = (details, res) => {
    try {
        var x = unify(details.input);
        Object.keys(x).forEach((e) => {
            if (!x[`${e}`])
                delete x[`${e}`]
        })

        if (!(x[Object.keys(x)[0]] == 'expDate')) {

            amanda.find(cloudant_query(x[Object.keys(x)[0]], x[Object.keys(x)[1]]), (err, result) => {   //console.log(result.docs);
                res.send({ ALL_RECORDS: result.docs });
            });
        }
        else{
            apiDateSearch(x[Object.keys(x)[1]],res)  
        }
        
    }
    catch (e) {
        res.send({ status: "ERROR" });
    }
}

module.exports = {searchRecord};


