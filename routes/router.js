var router = require('express').Router();
const path = require('path');


var html_files = path.join(__dirname, './../public/views/');
var excel_files = path.join(__dirname, './../public/excel_files/');

// record_ops
const { apiCountRecord } = require('./record_ops/apiCountRecord');
const { addRecord } = require('./record_ops/addRecord.js');
const { fetchAll } = require('./record_ops/fetchAll');
const { searchRecord } = require('./record_ops/searchRecord');
const { apiStatusSearch } = require('./record_ops/apiStatusSearch');
const { modalView } = require('./record_ops/modalView');
const { modalUpdate } = require('./record_ops/modalUpdate');

//login_ops
const { changePassword, changePasswordLogin } = require('./login_ops/changePassword');
const { forgotPassword } = require('./login_ops/forgotPassword');

// excel_ops
const { fill_Excel } = require('./excel_ops/excel_download');
const { disc_ops, json_text } = require('./excel_ops/excel_upload');
const { syncData } = require('./excel_ops/syncData');

// manageUsers
const { manageUsers } = require('./manageUsers/addRemove');


//express middleware
router.use((req, res, next) => {
  //console.log('USER ACCESSING THE APP');
  //res.send('APP IS NOW UNDER MAINTENANCE. PLEASE VISIT AFTER SOME TIME');
  next();
})

//************************** MAIN ROUTES ********************************//

//LOGIN STUFF

router.use('/', require(path.join(__dirname, './routerLogin.js')));


//HOME PAGE
router.get('/', checkAuth, (req, res) => {
  res.render('home');
})

//ADD PAGE MANUAL
router.get('/add', checkAuth, (req, res) => {
  res.render('add');
})

//ADD PAGE BULK
router.get('/bulk_upload', checkAuth, (req, res) => {
  res.render('bulkUpload');
})

//SEARCH PAGE
router.get('/search', checkAuth, (req, res) => {
  res.render('search');
})


//EXCEL_DOWNLOAD
router.get('/download', checkAuth, function (req, res) {
  file = path.join(excel_files, 'download/CERTIFICATE STATUS.xlsx')
  fill_Excel(res, file);
});

// CHANGE PASSWORD
router.get('/changePassword', checkAuth, (req, res) => {
  res.render('changePassword', { email: req.user.username, id: req.user.id, rev: req.user.rev });
})

//MAMANGE USERS
router.get('/manageUsers', checkAuth, (req, res) => {
  res.render('manageUsers');
})

//********************************************************************//


//*********************OTHER ROUTES  - OTHER OPS**********************//
router.get('/home', checkAuth, (req, res) => {
  apiCountRecord(res);
})

router.get('/add_details', checkAuth, (req, res) => {
  addRecord(req.query, res);
})

router.get('/fetch_all', checkAuth, (req, res) => {
  fetchAll(res);
})

router.get('/search_details', checkAuth, (req, res) => {
  searchRecord(req.query, res);
})

router.get('/radio_search', checkAuth, (req, res) => {
  apiStatusSearch(req.query, res);
})

router.get('/modal_view', checkAuth, (req, res) => {
  modalView(req.query.BTN_ID, res);
})

router.get('/modal_update', checkAuth, (req, res) => {
  modalUpdate(req.query, res);
})

router.post('/uploadExcel', checkAuth, function (req, res, next) {
  disc_ops(req, res);
})

router.get('/json_text', checkAuth, (req, res) => {
  json_text(res, req.query.file);
})

router.get('/syncData', checkAuth, (req, res) => {
  //console.log(req.query.ALLRECORDS);
  syncData(res, req.query.ALLRECORDS);
})

//********************************************************************//

//*******************OTHER ROUTES - PASSWORD CHANGE*******************// 

// AFTER LOGIN
router.post('/changePWD', checkAuth, (req, res) => {
  changePassword(req, res);
})

// MODAL LOGIN
router.post('/changePasswordLogin', (req, res) => {
  changePasswordLogin(req, res);
})

// PASSWORD FORGOT
router.post('/forgotPassword', (req, res) => {
  forgotPassword(req, res);
})

//********************************************************************//

//*******************OTHER ROUTES - MANAGE USERS**********************// 

// ADD USERS
router.post('/addUser', (req, res) => {
  manageUsers(req, res);
})

// REMOVE USERS
router.post('/removeUser', (req, res) => {

})

//********************************************************************//







//****** ROUTE MIDDLEWARE *********/

function checkAuth(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/login');
}

module.exports = router;


