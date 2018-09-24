var router = require('express').Router();
const path = require('path');

var html_files = path.join(__dirname, './../public/html/');
var excel_files = path.join(__dirname, './../public/excel_files/');

// record_ops
const { apiCountRecord } = require('./record_ops/apiCountRecord');
const { addRecord } = require('./record_ops/addRecord.js');
const { fetchAll } = require('./record_ops/fetchAll');
const { searchRecord } = require('./record_ops/searchRecord');
const { apiStatusSearch } = require('./record_ops/apiStatusSearch');
const { modalView } = require('./record_ops/modalView');
const { modalUpdate } = require('./record_ops/modalUpdate');

// excel_ops
const { fill_Excel } = require('./excel_ops/excel_download');
const { disc_ops, json_text } = require('./excel_ops/excel_upload');
const { syncData } = require('./excel_ops/syncData');

//express middleware
router.use((req, res, next) => {
  //console.log('USER ACCESSING THE APP');
  //res.send('APP IS NOW UNDER MAINTENANCE. PLEASE VISIT AFTER SOME TIME');
  next();
})

//HOME PAGE
router.get('/', (req, res) => {
  res.sendFile(html_files + 'home.html');
})

//ADD PAGE MANUAL
router.get('/add', (req, res) => {
  res.sendFile(html_files + 'add.html');
})

//ADD PAGE MANUAL
router.get('/bulk_upload', (req, res) => {
  res.sendFile(html_files + 'bulkUpload.html');
})

//SEARCH PAGE
router.get('/search', (req, res) => {
  res.sendFile(html_files + 'search.html');
})

//EXCEL_DOWNLOAD
router.get('/download', function (req, res) {
  file = path.join(excel_files, 'download/CERTIFICATE STATUS.xlsx')
  fill_Excel(res, file);
});


router.get('/home', (req, res) => {
  apiCountRecord(res);
})

router.get('/add_details', (req, res) => {
  addRecord(req.query, res);
})

router.get('/fetch_all', (req, res) => {
  fetchAll(res);
})

router.get('/search_details', (req, res) => {
  searchRecord(req.query, res);
})

router.get('/radio_search', (req, res) => {
  apiStatusSearch(req.query, res);
})

router.get('/modal_view', (req, res) => {
  modalView(req.query.BTN_ID, res);
})

router.get('/modal_update', (req, res) => {
  modalUpdate(req.query, res);
})

router.post('/uploadExcel', function (req, res, next) {
  disc_ops(req, res);
})

router.get('/json_text', (req, res) => {
  json_text(res, req.query.file);
})

router.get('/syncData', (req, res) => {
  syncData(res, req.query.ALLRECORDS);
})

module.exports = router;
