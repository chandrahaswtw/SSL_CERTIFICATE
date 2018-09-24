const {amanda} = require('./cloudant');
const {unify} = require('./bulkExports');

module.exports.addRecord = (details, res) => {

    try {
        amanda.insert(unify(details.input), (err, body) => {
            if (err)
                return res.send({ status: "ERROR" });
            console.log('RECORD ADDED');
            res.send({ status: "OK" });
        })
    }
    catch (e) {
        res.send({ status: "ERROR" });
    }
}