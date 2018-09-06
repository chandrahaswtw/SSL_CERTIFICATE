const axios = require('axios');
var moment = require('moment');
moment().format();
require('dotenv').config();
const { url } = require('./bulkExports');


var simplify = (data, color) => {

    return new Promise((resolve, reject) => {

        var simplify_data = data.reduce((acc, x) => {

            var d1 = new moment();
            var d2 = new moment();
            var d3 = new moment();
            var d4 = new moment(x.doc.expDate, 'MM-DD-YYYY');

            d1 = d1.add(40, 'd');
            d2 = d2.add(20, 'd');
            d3 = d3.add(10, 'd');

            if (color == "GREEN" && moment(d1).isSameOrBefore(d4))
                acc.push(x.doc);
            else if (color == "YELLOW" && moment(d1).isAfter(d4) && moment(d2).isSameOrBefore(d4))
                acc.push(x.doc);
            else if (color == "ORANGE" && moment(d2).isAfter(d4) && moment(d3).isSameOrBefore(d4))
                acc.push(x.doc);
            else if (color == "RED" && moment(d3).isSameOrAfter(d4))
                acc.push(x.doc);
            return acc
        }, []);

        resolve(simplify_data);
    })
}


var interim = (URL) => {
    return axios.get(url, {
        auth: {
            username: process.env.account,
            password: process.env.password
        }
    })
        .then((res) => { return (res.data.rows) })
}


var finnish = async (URL, color) => {
    try {
        var mass = await interim(URL);
        var simplify_data = await simplify(mass, color);
        return simplify_data;
    }
    catch (e) {
        return e;
    }
}

module.exports.apiStatusSearch = (RADIO, res) => {
    try {
        finnish(url, RADIO.radio)
            .then((suc) => { res.send({ ALL_RECORDS: suc }) })
            .catch((e) => { console.log(e) })
    }
    catch (e) {
        res.send({ STATUS: "ERROR" });
    }
}


// finnish(url, 'ORANGE')
//     .then((suc) => { console.log(suc) })
//     .catch((e) => { console.log(e) })










