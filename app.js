const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');

const { apiCountRecord } = require('./routes/apiCountRecord');
const { addRecord } = require('./routes/addRecord.js');
const { fetchAll } = require('./routes/fetchAll');
const { searchRecord } = require('./routes/searchRecord');
const { apiStatusSearch } = require('./routes/apiStatusSearch');
const { modalView } = require('./routes/modalView');
const { modalUpdate } = require('./routes/modalUpdate');

const app = express();
const port = process.env.PORT || '3000';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/')));
var static_files = path.join(__dirname, './public/html/')

//********HTML ROUTES ******//

//HOME PAGE
app.get('/', (req, res) => {
    res.sendFile(static_files + 'home.html');
})

//ADD PAGE MANUAL
app.get('/add', (req, res) => {
    res.sendFile(static_files + 'add.html');
})

//ADD PAGE MANUAL
app.get('/bulk_upload', (req, res) => {
    res.sendFile(static_files + 'bulkUpload.html');
})

//SEARCH PAGE
app.get('/search', (req, res) => {
    res.sendFile(static_files + 'search.html');;
})


//*********OTHER ROUTES*********//

app.get('/home', (req, res) => {
    apiCountRecord(res);
})

app.get('/add_details', (req, res) => {
    addRecord(req.query, res);
})

app.get('/fetch_all', (req, res) => {
    fetchAll(res);
})

app.get('/search_details', (req, res) => {
    searchRecord(req.query, res);
})

app.get('/radio_search', (req, res) => {
    apiStatusSearch(req.query, res);
})

app.get('/modal_view', (req, res) => {
    modalView(req.query.BTN_ID, res);
})

app.get('/modal_update', (req, res) => {
    modalUpdate(req.query, res);
})




//*******************APP LISTEN ************//
app.listen(port, () => { console.log('APP STARTED') });
