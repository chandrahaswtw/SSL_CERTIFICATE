const axios = require('axios');
var moment = require('moment');
moment().format();
const {url} = require('./bulkExports');


var simplify = (data,color) => {

    return new Promise((resolve, reject) => {

    
            var simplify_data = data.reduce((acc, x) => {

                var d1 = new moment();
                var d2 = new moment();
                var d3 = new moment(x.doc.expDate, 'MM-DD-YYYY');
                if (!isNaN(Number(x.doc.thresholdDays)))
                t_Days = Number(x.doc.thresholdDays);
                else
                t_Days = 30;
                d1 = d1.add((t_Days + 30), 'd');
                d2 = d2.add(t_Days, 'd');

                if(color=="GREEN" && moment(d1).isSameOrBefore(d3))
                    acc.push(x.doc);
                else if(color=="YELLOW" && moment(d1).isSameOrAfter(d3) && moment(d2).isSameOrBefore(d3))
                    acc.push(x.doc);
                else if(color=="RED" && moment(d2).isSameOrAfter(d3))
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


var finnish = async (URL,color) => {
    try {
        var mass = await interim(URL);
        var simplify_data = await simplify(mass,color);
        return simplify_data;
    }
    catch (e) {
        return e;
    }
}

module.exports.apiStatusSearch = (RADIO,res) => {
    try {
        finnish(url,RADIO.radio)
            .then((suc) => { res.send({ ALL_RECORDS: suc }) })
            .catch((e) => { console.log(e) })
    }
    catch (e) {
        res.send({ STATUS: "ERROR" });
    }
}


// finnish(url,'YELLOW')
//             .then((suc) => { console.log(suc) })
//             .catch((e) => { console.log(e) })










