const { amanda } = require('./../record_ops/cloudant');
const Excel = require('exceljs');
var moment = require('moment');
moment().format();
var wb, ws;

function excel_config() {
  wb = new Excel.Workbook();
  ws = wb.addWorksheet('CERTIFICATE STATUS', {
    views: [
      { state: 'frozen', ySplit: 1 }
    ], properties: { tabColor: { argb: (179, 0, 0) } }
  });

  //***** HEADER STYLING BEGIN *****//
  ws.columns = [
    { header: 'APP ID', key: 'appId', width: 15 },
    { header: 'APP NAME', key: 'appName', width: 40 },
    { header: 'ENVIRONMENT', key: 'envName', width: 20 },
    { header: 'SERVER', key: 'serverName', width: 20 },
    { header: 'PORTFOLIO', key: 'portfolioName', width: 32 },
    { header: 'CERTIFICATE NAME', key: 'certName', width: 32 },
    { header: 'EXPIRY DATE (MM/DD/YY)', key: 'expDate', width: 25, style: { alignment: { vertical: 'bottom', horizontal: 'left' } } },
    { header: 'PRIMARY NAME', key: 'primaryName', width: 32 },
    { header: 'PRIMARY PHONE', key: 'primaryPhone', width: 20 },
    { header: 'PRIMARY EMAIL', key: 'primaryEmail', width: 32 },
    { header: 'SECONDARY NAME', key: 'secondaryName', width: 32 },
    { header: 'SECONDARY PHONE', key: 'secondaryPhone', width: 20 },
    { header: 'SECONDARY EMAIL', key: 'secondaryEmail', width: 32 },
    { header: 'ALERT TOOL NAME', key: 'alertToolName', width: 20 },
    { header: 'ALERT MECHANISM', key: 'alertMech', width: 20 },
    { header: 'REMARKS', key: 'remarks', width: 40 }
  ];

  var dobCol = ws.getRow(1);
  dobCol.font = { bold: true };

  ws.getRow(1).eachCell((c, rn) => {
    c.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4286f4' }
    };
    c.border = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' }
    }
  });
}
// ************* //

var query = {
  selector: {
    _id: {
      $gt: '0'
    }
  },
  sort: [
    {
      _id: 'asc'
    }
  ]
};

function calcular(EXP) {
  var d1 = new moment();
  var d2 = new moment();
  var d3 = new moment();
  var d4 = new moment(EXP, 'MM-DD-YYYY');

  d1 = d1.add(40, 'd');
  d2 = d2.add(20, 'd');
  d3 = d3.add(10, 'd');

  if (moment(d1).isSameOrBefore(d4))
    return '00cc00';
  else if (moment(d1).isAfter(d4) && moment(d2).isSameOrBefore(d4))
    return 'ffff00';
  else if (moment(d2).isAfter(d4) && moment(d3).isSameOrBefore(d4))
    return 'ff9933';
  else if (moment(d3).isSameOrAfter(d4)) return 'ff0000';

}

function data() {
  return new Promise((resolve, reject) => {
    amanda.find(query, (err, result) => {
      resolve(result.docs);
    })
  })
}

async function fill_Excel(res, file) {
  try {
    excel_config();
    var data_array = await data();
    ws.addRows(data_array);
    ws.getColumn(7).eachCell((cell, rowNumber) => {
      if (rowNumber > 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: calcular(cell.value) }
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    wb.xlsx.writeFile(file).then(function () {
      res.download(file, (err) => {
        if (!err) {
          console.log('EXCEL FILE DOWNLOADED');
        }
      });
    });

  }
  catch (e) {
  }
}

module.exports = { fill_Excel };





