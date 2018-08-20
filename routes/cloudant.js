const Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({account:process.env.account, password:process.env.password});
var amanda = cloudant.db.use('dummy');

//*****FUNCTIONS*****//
function unify(data) {
    var unified_data = data.reduce(function(acc, x) {
        acc[`${x.name}`] = x.value;
      return acc;
      }, {});
      return unified_data;
}

function cloudant_query(PARAM1, PARAM2) {
    if(PARAM1 == 'expDate')
            return {
                "selector": {
                "_id": {
                    "$gt": "0"
                },
                "expDate": {
                    "$lte": `${PARAM2}`
                },
                    //[`${PARAM1}`]: `${PARAM2}`
                },
                "fields": [
                "_id",
                "appId",
                "appName",
                "serverName",
                "expDate"
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
            "expDate"
        ],
        "sort": [
        {
            "_id": "asc"
        }
        ]
    };
         
}

//*****EXPORTS*****//
module.exports.add_record = (details,res)=>{

    amanda.insert(unify(details.input),(err,body)=>{
        if(err)    
        return res.send({status:"ERROR"});
        console.log('RECORD ADDED');
        res.send({status:"OK"});
      })
}

module.exports.search_record = (details,res)=>{

    var x = unify(details.input);
    Object.keys(x).forEach((e)=>{
        if(!x[`${e}`])
           delete x[`${e}`]
    })
   
    amanda.find(cloudant_query(x[Object.keys(x)[0]],x[Object.keys(x)[1]]),(err,result)=>
    {   console.log(result.docs);
        res.send({ALL_RECORDS:result.docs});
    });    
}


module.exports.fetch_all = (res) =>{
    amanda.list({include_docs:true},function (err,data) {
        console.log(data.rows);
        res.send({ALL_RECORDS : data.rows});
    });
}



