// MULTER
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const fs = require("fs");
const path = require('path');

var disc_ops = (req, res) => {
  var newFile_splitted;
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/excel_files/upload')
    },
    filename: function (req, file, cb) {
      var newFile = `${file.originalname.split('.')[0]}_${Date.now()}.${file.originalname.split('.')[1]}`;
      newFile_splitted = newFile.split('.')[0];
      cb(null, newFile);
    }
  })

  var upload = multer({
    storage: storage
  }).single('avatar');


  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.redirect(`/bulk_upload#${newFile_splitted}`);
    convertToJSON(newFile_splitted);
  });

}

//CONVERSION OF EXCEL TO JSON

function convertToJSON(newFile_splitted) {

  const excelToJson = require('convert-excel-to-json');
  const result = excelToJson({
    sourceFile: `./public/excel_files/upload/${newFile_splitted}.xlsx`,
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

  var writeStream = fs.createWriteStream(`./public/excel_files/upload/${newFile_splitted}.json`);
  writeStream.write(JSON.stringify(result['CERTIFICATE STATUS']));
  writeStream.end();

}

var json_text = (res, file) => {
  fs.readFile(`./public/excel_files/upload/${file}.json`, (err, data) => {
    if (err)
      return res.send({ status: "ERROR" });

    fs.unlink(`./public/excel_files/upload/${file}.json`, (err) => {
      if (err)
        return console.log(err);
    });

    fs.unlink(`./public/excel_files/upload/${file}.xlsx`, (err) => {
      if (err)
        return console.log(err);
    });

    res.send({ data: JSON.parse(data) });

  });
}

//EXPORTS
module.exports = {
  disc_ops, json_text
}