const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
  sourceFile: './public/excel_files/upload/CERTIFICATE_STATUS_TEMPLATE_1537708306401.xlsx',
  header: { rows: 1 },
  columnToKey: {
    A: 'appId',
    B: 'appName',
    C: 'envName',
    D: 'serverName',
    E: 'portfolioName',
    F: 'certName',
    G: 'expDate',
    H: 'primaryName',
    I: 'primaryPhone',
    J: 'primaryEmail',
    K: 'secondaryName',
    L: 'secondaryPhone',
    M: 'secondaryEmail',
    N: 'alertToolName',
    O: 'alertMech'
  }
});
//console.log(JSON.stringify(result['CERTIFICATE STATUS']));

var fs = require("fs");

// fs.unlink('./JournalDEV.txt', (err) => {
//   if (err) throw err;
//   console.log('successfully deleted /tmp/hello');
// });

var writeStream = fs.createWriteStream("./JournalDEV.json");
writeStream.write(JSON.stringify(result['CERTIFICATE STATUS']));
writeStream.end();


//console.log(result);