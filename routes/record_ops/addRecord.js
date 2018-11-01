const { amanda } = require('./cloudant');
const { unify } = require('./bulkExports');
var moment = require('moment');
moment().format();

module.exports.addRecord = (details, res) => {

    var x = unify(details.input);
    if ((x.remarks).length > 0)
        x.remarks = `${new moment().format('MM-DD-YYYY HH:mm:ss')} : ${x.remarks}`
    x.appId = (x.appId).toUpperCase();
    x.serverName = (x.appId).toUpperCase();
    x.appName = (x.appName).toUpperCase();

    try {

        amanda.find({
            "selector": {
                "_id": {
                    "$gt": "0"
                },
                "appId": x.appId,
                "serverName": x.serverName
            }
        }, function (err, res_dup) {

            console.log(res_dup.docs[0]);

            if (res_dup.docs[0])
                return res.send({ status: "DUPLICATE" })

            amanda.insert(x, (err, body) => {
                if (err)
                    return res.send({ status: "ERROR" });
                console.log('RECORD ADDED');
                res.send({ status: "OK" });
            })

        }
        )

    }

    catch (e) {
        res.send({ status: "ERROR" });
    }
}