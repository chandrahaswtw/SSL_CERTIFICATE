require('dotenv').config();
const axios = require('axios');
var moment = require('moment');
moment().format();


var d1 = new moment();
var d2 = new moment();
var d3 = new moment('09/15/2018', 'MM-DD-YYYY');
if (!isNaN(Number(10)))
t_Days = Number(t_Days);
else
t_Days = 30;
d1 = d1.add((t_Days + 30), 'd');
d2 = d2.add(t_Days, 'd');

if(moment(d1).isSameOrAfter(d3) && moment(d2).isSameOrBefore(d3))
console.log('YO MAMA');

console.log('d1 is',d1);
console.log('d2 is',d2);
console.log('d3 is',d3);













