const axios = require('axios');
var moment = require('moment');
moment().format();
const {url} = require('./bulkExports');


var simplify = (data,color) => {

    return new Promise((resolve, reject) => {

            var TOTAL_COUNT = data.total_rows;
            var SAFE_COUNT = 0;
            var UNSAFE_COUNT = 0;
            var DANGER_COUNT = 0;

            var simplify_data = data.rows.reduce((acc, x) => {

                var d1 = new moment();
                var d2 = new moment();
                var d3 = new moment(x.doc.expDate, 'MM-DD-YYYY');
                if (!isNaN(Number(x.doc.thresholdDays)))
                t_Days = Number(x.doc.thresholdDays);
                else
                t_Days = 30;
                d1 = d1.add((t_Days + 30), 'd');
                d2 = d2.add(t_Days, 'd');

                if(moment(d1).isSameOrBefore(d3))
                    SAFE_COUNT++;
                else if(moment(d1).isSameOrAfter(d3) && moment(d2).isSameOrBefore(d3))
                    UNSAFE_COUNT++;
                else if(moment(d2).isSameOrAfter(d3))
                    DANGER_COUNT++;
                return acc
            }, []);


            resolve({SAFE_COUNT,UNSAFE_COUNT,DANGER_COUNT,TOTAL_COUNT});
        

    })
}


var interim = (URL) => {
return axios.get(url, {
    auth: {
        username: process.env.account,
        password: process.env.password
    }
})
    .then((res) => { return (res.data) })
}


var finnish = async (URL) => {
    try {
        var mass = await interim(URL);
        var simplify_data = await simplify(mass);
        return simplify_data;
    }
    catch (e) {
        return e;
    }
}

module.exports.apiCountRecord = (res) => {
    try {
        finnish(url)
            .then((suc) => { res.send(suc) })
            .catch((e) => { console.log(e) })
    }
    catch (e) {
        res.send({ STATUS: "ERROR" });
    }
}


// finnish(url,'YELLOW')
//             .then((suc) => { console.log(suc) })
//             .catch((e) => { console.log(e) })










