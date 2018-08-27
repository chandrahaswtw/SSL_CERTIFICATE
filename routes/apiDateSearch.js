const axios = require('axios');
var moment = require('moment');
moment().format();
const {url} = require('./bulkExports');


var simplify = (data, date) => {

    return new Promise((resolve, reject) => {
        var simplify_data = data.reduce((acc, x) => {
            if (moment(moment(x.doc.expDate, 'MM-DD-YYYY')).isSameOrBefore(moment(date, 'MM-DD-YYYY')))
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


var finnish = async (URL,expDate) => {
    try {
        var mass = await interim(URL);
        var simplify_data = await simplify(mass,expDate);
        return simplify_data;
    }
    catch (e) {
        return e;
    }
}

module.exports.apiDateSearch = (expDate,res) => {
    try {
        finnish(url,expDate)
            .then((suc) => { res.send({ ALL_RECORDS: suc }) })
            .catch((e) => { console.log(e) })
    }
    catch (e) {
        res.send({ STATUS: "ERROR" });
    }
}


// finnish(url,'08/01/2019')
//             .then((suc) => { console.log(suc) })
//             .catch((e) => { console.log(e) })










