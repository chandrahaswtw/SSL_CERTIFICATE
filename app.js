const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const cloudant = require('./routes/cloudant');

const app = express();
const port = process.env.PORT || '3000';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));
var static_files = path.join(__dirname, './public/html/')

//HOME PAGE
app.get('/',(req,res)=>{
    res.sendFile(static_files + 'home.html');
    //cloudant.fetch_all(res);
})

//ADD PAGE MANUAL
app.get('/add',(req,res)=>{
    res.sendFile(static_files + 'add.html');
})

//ADD PAGE MANUAL
app.get('/bulk_upload',(req,res)=>{
    res.sendFile(static_files + 'bulkUpload.html');
})

//SEARCH PAGE
app.get('/search',(req,res)=>{
    res.sendFile(static_files + 'search.html');;
})


//**************DUMMY ROUTES**************//
app.get('/home_details',(req,res)=>{
    cloudant.fetch_all(res);
})


app.get('/search_details',(req,res)=>{
    cloudant.search_record(req.query,res);

})

app.get('/add_details',(req,res)=>{
    cloudant.add_record(req.query,res);
})


//*******************APP LISTEN ************//
app.listen(port,()=>{console.log('APP STARTED')});
