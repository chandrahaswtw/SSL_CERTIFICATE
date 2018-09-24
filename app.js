const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || '3000';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/')));

app.use('/', require('./routes/router'));

app.listen(port, () => { console.log('APP STARTED') });
