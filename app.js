const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || '3000';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/')));



// TEMPLATE ENGINE AND VIEWS
app.set('views', path.join(__dirname + '/public/views/'));
app.set('view engine', 'ejs');

// SESSION STUFF
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

// PASSPORT
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// CONNECT - FLASH
var flash = require('connect-flash');
app.use(flash());


// ROUTES
app.use('/', require('./routes/router'));


app.listen(port, () => { console.log('APP STARTED') });
