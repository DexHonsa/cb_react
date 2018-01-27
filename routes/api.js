'use strict';
var config = require(__dirname + '/../config.js');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://iwantmoredexx:Awesomeo21!@cluster0-shard-00-00-l9gyz.mongodb.net:27017,cluster0-shard-00-01-l9gyz.mongodb.net:27017,cluster0-shard-00-02-l9gyz.mongodb.net:27017/commonbrain?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
var CircularJSON = require('circular-json');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var XLSX = require('xlsx');

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let transporter = nodemailer.createTransport(smtpTransport({
  name: 'Server', host: 'mail.commonbrain.io',
  //maxConnections: 1,
  port: 587,
  secure: false,
  auth: {
    user: 'support@commonbrain.io',
    pass: 'Support1!'
  },
  tls: {
    //ciphers: 'SSLv3',
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_method"
  }

}));
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './tmp/')
  },
  filename: function(req, file, cb) {
    //var datetimestamp = Date.now();
    cb(null, file.originalname)
  }
});
var upload = multer({
  storage: storage,
  onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
    }).single('file');



var storage2 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    //var datetimestamp = Date.now();
    cb(null, 'ClosingExcel.xlsx')
  }
});
var upload2 = multer({
  storage: storage2,
  onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
    }).single('file');
var storage_applications = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    //var datetimestamp = Date.now();
    cb(null, 'Application_Legend.xlsx')
  }
});
var upload_applications = multer({
  storage: storage_applications,
  onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
    }).single('file');

var options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      //connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      //connectTimeoutMS: 30000
    }
  }
};
mongoose.connect('mongodb://iwantmoredexx:Awesomeo21!@cluster0-shard-00-00-l9gyz.mongodb.net:27017,cluster0-shard-00-01-l9gyz.mongodb.net:27017,cluster0-shard-00-02-l9gyz.mongodb.net:27017/commonbrain?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', options);
var db = mongoose.connection;
var ObjectId = require('mongodb').ObjectId;




exports.ImportBasic_old = function(req,res){
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
      //var datetimestamp = Date.now();
      cb(null, 'ImportBasic.xlsx')
    }
  });

  var upload = multer({
    storage: storage,
    onError : function(err, next) {
          console.log('error', err);
          next(err);
        }
      }).single('file');


    upload(req,res,function(err){

      if(err) {
        res.json({error_code:1, err_desc:err});
        return;
      }
      if (!req.file) {
        res.json({error_code: 1, err_desc: "No file passed"});
        return;
      }
      workbook.xlsx.readFile(req.file.path).then(function() {
          var worksheet = workbook.getWorksheet('Sheet1');
          var sheet = JSON.parse(CircularJSON.stringify(workbook));
          res.json(sheet);
      })


    });
}
exports.ImportTest = function(req,res){
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
      //var datetimestamp = Date.now();
      cb(null, 'SuperText.xlsx')
    }
  });

  var upload = multer({
    storage: storage,
    onError : function(err, next) {
          console.log('error', err);
          next(err);
        }
      }).single('file');

    upload(req,res,function(err){

      if(err) {
        res.json({error_code:1, err_desc:err});
        return;
      }
      if (!req.file) {
        res.json({error_code: 1, err_desc: "No file passed"});
        return;
      }

      workbook.xlsx.readFile(req.file.path).then(function() {


          var worksheet = workbook.getWorksheet('Sheet1');
          var sheet = JSON.parse(CircularJSON.stringify(worksheet));
          for (var i = 0, len = sheet._rows.length; i < len; i++) {
            if (sheet._rows[i]._cells != null) {
              for (var i2 = 0, len2 = sheet._rows[i]._cells.length; i2 < len2; i2++) {
                if (sheet._rows[i]._cells[i2] != null) {
                  if(sheet._rows[i]._cells[i2]._value.model.style != null &&  sheet._rows[i]._cells[i2]._value.model.style.toString().indexOf('~') > -1){
                    var styleArr = sheet._rows[i]._cells[i2]._value.model.style.toString().split('~');
                    var styleLetter;

                    if(styleArr[4] == 0){
                      styleLetter = 'A';
                    }
                    if(styleArr[4] == 1){
                      styleLetter = 'B';
                    }
                    if(styleArr[4] == 2){
                      styleLetter = 'C';
                    }
                    if(styleArr[4] == 3){
                      styleLetter = 'D';
                    }
                    if(styleArr[4] == 4){
                      styleLetter = 'E';
                    }
                    if(styleArr[4] == 5){
                      styleLetter = 'F';
                    }
                    if(styleArr[4] == 6){
                      styleLetter = 'G';
                    }
                    if(styleArr[4] == 7){
                      styleLetter = 'H';
                    }

                    var getCell = worksheet.getCell(styleLetter + (parseInt(styleArr[2]) + 1)).style;
                    if(getCell.numFmt != null){
                      var tempNumFormat = JSON.parse(CircularJSON.stringify(getCell.numFmt));
                      if(tempNumFormat.indexOf('$') > -1){

                      }
                      if(tempNumFormat.indexOf('%') > -1){

                      }

                    }


                  }
                  if(sheet._rows[i]._cells[i2]._value.model.style != null  &&  sheet._rows[i]._cells[i2]._value.model.style.numFmt != null){
                    if(sheet._rows[i]._cells[i2]._value.model.style.numFmt.indexOf('$') > -1){

                    }
                    if(sheet._rows[i]._cells[i2]._value.model.style.numFmt.indexOf('%') > -1){

                      //console.log(sheet._rows[i]._cells[i2]._value.model.style.numFmt + ':percent');
                    }

                  }
                }
              }
            }
          }

          res.json(sheet);
      })


    });
}
exports.ImportLoan = function(req,res){


    upload2(req,res,function(err){

      if(err) {
        res.json({error_code:1, err_desc:err});
        return;
      }
      if (!req.file) {
        res.json({error_code: 1, err_desc: "No file passed"});
        return;
      }

      workbook.xlsx.readFile(req.file.path).then(function() {


          var worksheet = workbook.getWorksheet('Loan');
          var sheet = JSON.parse(CircularJSON.stringify(worksheet));
          var newSheet = {};
          var headers = [];
          var lien1 = {};
          var lien2 = {};
          var lien3 = {};
          for(var i = 7; i <= 22; i++){



            for(var ic = 0, len = sheet._rows[i]._cells.length; ic <= len; ic++ ){


              //res.send(sheet._rows[i]._cells[ic]);


               if(sheet._rows[i]._cells[ic] !== undefined && sheet._rows[i]._cells[ic] !== null){

                  var header;

                  if(sheet._rows[i]._cells[ic]._value.model.address.indexOf('A') !== -1){
                    header = sheet._rows[i]._cells[ic]._value.model.value;
                  }
                  if(sheet._rows[i]._cells[ic]._value.model.address.indexOf('B') !== -1){
                    if(sheet._rows[i]._cells[ic]._value.model.value != undefined){
                      lien1[header] = sheet._rows[i]._cells[ic]._value.model.value;
                    }else{
                      lien1[header] = sheet._rows[i]._cells[ic]._value.model.result;
                    }
                  }
                  if(sheet._rows[i]._cells[ic]._value.model.address.indexOf('C') !== -1){
                    if(sheet._rows[i]._cells[ic]._value.model.value != undefined){
                      lien2[header] = sheet._rows[i]._cells[ic]._value.model.value;
                    }else{
                      lien2[header] = sheet._rows[i]._cells[ic]._value.model.result;
                    }
                  }
                  if(sheet._rows[i]._cells[ic]._value.model.address.indexOf('D') !== -1){
                    if(sheet._rows[i]._cells[ic]._value.model.value != undefined){
                      lien3[header] = sheet._rows[i]._cells[ic]._value.model.value;
                      //lien3['object' + i] = sheet._rows[i];
                    }else{

                      lien3[header] = 'HEADER';
                      //lien3[header] = sheet._rows[i]._cells[ic]._value.model.result;
                    }
                  }
               }
            }


            newSheet[i] = sheet._rows[i]._cells.address
          }
          MongoClient.connect(URL, function(err, db) {
            if (err)
              throw err;


            var collection2 = db.collection('loanData');
            collection2.remove();
            collection2.insert(lien1);
            collection2.insert(lien2);
            collection2.insert(lien3);
            res.json(lien1,lien2,lien3);
            db.close();
          })

        //  res.send(liens);
      })


    });
}
exports.ImportExcel = function(req, res) {
  upload_applications(req, res, function(err) {
    if (err) {
      res.json({error_code: 1, err_desc: err});
      return;
    }
    if (!req.file) {
      res.json({error_code: 1, err_desc: "No file passed"});
      return;
    }

    workbook.xlsx.readFile(req.file.path).then(function() {
      var worksheet = workbook.getWorksheet('TestImport');
      var sheet2 = JSON.parse(CircularJSON.stringify(worksheet));
      var arr = [];
      for (var i = 0, len = sheet2._rows.length; i < len; i++) {
        if (sheet2._rows[i]._number != 1) {
          var Obj = {};
          for (var i2 = 0, len2 = sheet2._rows[i]._cells.length; i2 < len2; i2++) {
            if (sheet2._rows[i]._cells[i2] !== null && sheet2._rows[i]._cells[i2] !== undefined) {
              var cell = sheet2._rows[i]._cells[i2]._value.model.address;
              if (sheet2._rows[i]._cells[i2]._value.model.value === undefined) {
                if (cell.indexOf('A') > -1) {
                  Obj['applicationName'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('B') > -1) {
                  Obj['applicationType'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('C') > -1) {
                  Obj['riskScore'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('D') > -1) {
                  Obj['adminName'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('E') > -1) {
                  Obj['adminEmail'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('F') > -1) {
                  Obj['numberOfSeats'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('G') > -1) {
                  Obj['numberOfSeatsLink'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('H') > -1) {
                  Obj['expirtaion'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('I') > -1) {
                  Obj['expirationLink'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('J') > -1) {
                  Obj['compliancyPercentage'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('K') > -1) {
                  Obj['compliancyPercentageLink'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
                if (cell.indexOf('L') > -1) {
                  Obj['downloadLink'] = sheet2._rows[i]._cells[i2]._value.model.text;
                }
              } else {
                if (cell.indexOf('A') > -1) {
                  Obj['applicationName'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('B') > -1) {
                  Obj['applicationType'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('C') > -1) {
                  Obj['riskScore'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('D') > -1) {
                  Obj['adminName'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('E') > -1) {
                  Obj['adminEmail'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('F') > -1) {
                  Obj['numberOfSeats'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('G') > -1) {
                  Obj['numberOfSeatsLink'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('H') > -1) {
                  Obj['expirtaion'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('I') > -1) {
                  Obj['expirationLink'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('J') > -1) {
                  Obj['compliancyPercentage'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('K') > -1) {
                  Obj['compliancyPercentageLink'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
                if (cell.indexOf('L') > -1) {
                  Obj['downloadLink'] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
              }
            }
          }
          arr.push(Obj);
        }
      }
      MongoClient.connect(URL, function(err, db) {
        if (err)
          throw err;

        var collection = db.collection("applications")
        collection.remove();

        collection.insert(arr)
        res.json(arr);

      })

    });
  })
}

exports.ImportBasic = function(req, res) {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
      //var datetimestamp = Date.now();
      cb(null, 'ImportBasic.xlsx')
    }
  });

  var upload = multer({
    storage: storage,
    onError : function(err, next) {
          console.log('error', err);
          next(err);
        }
      }).single('file');

  upload(req, res, function(err) {
      var filename = req.file.filename;
            //extract Data
            var workbook = XLSX.readFile(req.file.path);
            var sheet = JSON.parse(CircularJSON.stringify(workbook));
            var titles = [];

            var nameRangesRaw = sheet.Workbook.Names;
            var nameRanges = {};
            for (var i = 0, len = nameRangesRaw.length; i < len; i++) {
              if(nameRangesRaw[i].Sheet != null && nameRangesRaw[i].Sheet == 0){

              }else{
                var refArr = nameRangesRaw[i].Ref.split("$");
                if(sheet.Sheets.Sheet1[refArr[1] + refArr[2]] != null){
                  nameRanges[nameRangesRaw[i].Name] = sheet.Sheets.Sheet1[refArr[1] + refArr[2]].w
                }
              }


            }
            var rows = {};
            for (var i = 0, len = Object.keys(sheet.Sheets.Sheet1).length; i < len; i++) {
              if (i > 1) {
                var rowNumber = Object.keys(sheet.Sheets.Sheet1)[i].substr(1);

                if (rows[rowNumber] == undefined) {
                  rows[rowNumber] = {};
                }

                //
                if(sheet.Sheets.Sheet1[Object.keys(sheet.Sheets.Sheet1)[i]].w != null){
                  rows[rowNumber][Object.keys(sheet.Sheets.Sheet1)[i]] = sheet.Sheets.Sheet1[Object.keys(sheet.Sheets.Sheet1)[i]].w
                }

              }
            }
            var headers = [];
            var arr = [];
            for (var i = 0, len = Object.keys(rows["2"]).length; i < len; i++) {
              headers.push(rows["2"][Object.keys(rows["2"])[i]]);
            }
            for (var i = 3, len = Object.keys(rows).length; i < len; i++) {
              var rowObj = {};
              var number = i.toString();
              if(rows[number] != null){
                for (var i2 = 0, len2 = Object.keys(rows[number]).length; i2 < len2; i2++) {
                  var cell = Object.keys(rows[number])[i2];

                  var letter = cell.charAt(0);
                  var header;
                  if (letter == 'A') {
                    header = headers[0]
                  }
                  if (letter == 'B') {
                    header = headers[1]
                  }
                  if (letter == 'C') {
                    header = headers[2]
                  }
                  if (letter == 'D') {
                    header = headers[3]
                  }
                  if (letter == 'E') {
                    header = headers[4]
                  }
                  if (letter == 'F') {
                    header = headers[5]
                  }
                  if (letter == 'G') {
                    header = headers[6]
                  }
                  if (letter == 'H') {
                    header = headers[7]
                  }
                  if (letter == 'I') {
                    header = headers[8]
                  }
                  if (letter == 'J') {
                    header = headers[9]
                  }
                  if (letter == 'K') {
                    header = headers[10]
                  }
                  if (letter == 'L') {
                    header = headers[11]
                  }
                  if (letter == 'M') {
                    header = headers[12]
                  }
                  if (letter == 'N') {
                    header = headers[13]
                  }
                  if (letter == 'O') {
                    header = headers[14]
                  }
                  rowObj[header] = rows[number][Object.keys(rows[number])[i2]]
                }
              }

              arr.push(rowObj);
            }




            res.json(arr);





  });
}

exports.ImportNewExcel = function(req, res) {
  upload(req, res, function(err) {
    var userId = req.body.userId;
    var portfolioId = req.body.portfolioId;
    var date = new Date;

    mkdirp('./uploads/' + userId + '/' + portfolioId, function(err) {
      var dir = userId + '/' + portfolioId

      var filename = req.file.filename;
      fs.move('./tmp/' + filename, './uploads/' + dir + '/' + filename, function(err) {
        if (err) {

          res.status(401).json({
            errors: {
              form: "File Exists"
            }
          });
        }
        MongoClient.connect(URL, function(err, db) {
          if (err)
            throw err;
          var collection = db.collection('portfolioItems');
          var portfolioItemObj = {
            userId: userId,
            portfolioId: portfolioId,
            name: filename,
            lastUpdated:date
          }
          collection.insert(portfolioItemObj, function(err, result) {
            if (err)
              throw err;
            var portfolioItemId = result.insertedIds[0].toString();


            //extract Data
            var workbook = XLSX.readFile('./uploads/' + dir + '/' + filename);
            var sheet = JSON.parse(CircularJSON.stringify(workbook));
            var titles = [];
            var nameRangesRaw = sheet.Workbook.Names;
            var nameRanges = {};
            for (var i = 0, len = nameRangesRaw.length; i < len; i++) {
              var refArr = nameRangesRaw[i].Ref.split("$");

              if(sheet.Sheets.Sheet1[refArr[1] + refArr[2]] != null){
              nameRanges[nameRangesRaw[i].Name] = sheet.Sheets.Sheet1[refArr[1] + refArr[2]].w;
            }
            }
            var rows = {};
            for (var i = 0, len = Object.keys(sheet.Sheets.Sheet1).length; i < len; i++) {
              if (i > 1) {
                var rowNumber = Object.keys(sheet.Sheets.Sheet1)[i].substr(1);

                if (rows[rowNumber] == undefined) {
                  rows[rowNumber] = {};
                }
                if(sheet.Sheets.Sheet1[Object.keys(sheet.Sheets.Sheet1)[i]].w != null){
                rows[rowNumber][Object.keys(sheet.Sheets.Sheet1)[i]] = sheet.Sheets.Sheet1[Object.keys(sheet.Sheets.Sheet1)[i]].w
              }
              }
            }
            var headers = [];
            var arr = [];
            for (var i = 0, len = Object.keys(rows["2"]).length; i < len; i++) {
              headers.push(rows["2"][Object.keys(rows["2"])[i]]);
            }
            for (var i = 3, len = Object.keys(rows).length; i < len; i++) {
              var rowObj = {
                userId: userId,
                portfolioId: portfolioId,
                portfolioItemId: portfolioItemId
              };
              var number = i.toString();
                if(rows[number] != null){
              for (var i2 = 0, len2 = Object.keys(rows[number]).length; i2 < len2; i2++) {
                var cell = Object.keys(rows[number])[i2];

                var letter = cell.charAt(0);
                var header;
                if (letter == 'A') {
                  header = headers[0]
                }
                if (letter == 'B') {
                  header = headers[1]
                }
                if (letter == 'C') {
                  header = headers[2]
                }
                if (letter == 'D') {
                  header = headers[3]
                }
                if (letter == 'E') {
                  header = headers[4]
                }
                if (letter == 'F') {
                  header = headers[5]
                }
                if (letter == 'G') {
                  header = headers[6]
                }
                if (letter == 'H') {
                  header = headers[7]
                }
                if (letter == 'I') {
                  header = headers[8]
                }
                if (letter == 'J') {
                  header = headers[9]
                }
                if (letter == 'K') {
                  header = headers[10]
                }
                if (letter == 'L') {
                  header = headers[11]
                }
                if (letter == 'M') {
                  header = headers[12]
                }
                if (letter == 'N') {
                  header = headers[13]
                }
                if (letter == 'O') {
                  header = headers[14]
                }
                rowObj[header] = rows[number][Object.keys(rows[number])[i2]]
              }
            }
              arr.push(rowObj);
            }
            var basicDetailObj = {
              userId: userId,
              portfolioId: portfolioId,
              portfolioItemId:portfolioItemId,
              title: nameRanges.Title,
              imgUrl:nameRanges.ImgUrl
            }


            MongoClient.connect(URL, function(err, db) {
              if (err)
                throw err;

              var collection = db.collection('uploadData');
              var collection2 = db.collection('properties');
              collection2.remove({portfolioItemId: portfolioItemId})
              collection2.insert(basicDetailObj);
              collection.remove({portfolioItemId: portfolioItemId});

              collection.insert(arr);
              res.json(arr);

            })
            //res.json(arr);

          });
        });
      });
    });
  });
}
exports.UpdateNewExcel = function(req, res) {
  upload(req, res, function(err) {
    var userId = req.body.userId;
    var portfolioId = req.body.portfolioId;
    var portfolioItemId = req.body.portfolioItemId;
    var date = new Date;
      var dir = userId + '/' + portfolioId
      var filename = req.body.filename;
      fs.move('./tmp/' + req.file.filename, './uploads/' + dir + '/' + filename,{ overwrite: true }, function (err) {
        if (err) {

          res.status(401).json({
            errors: {
              form: "File Exists"
            }
          });
        }


            //extract Data
            var workbook = XLSX.readFile('./uploads/' + dir + '/' + filename);
            var sheet = JSON.parse(CircularJSON.stringify(workbook));
            var titles = [];
            var nameRangesRaw = sheet.Workbook.Names;
            var nameRanges = {};
            for (var i = 0, len = nameRangesRaw.length; i < len; i++) {
              var refArr = nameRangesRaw[i].Ref.split("$");

              if(sheet.Sheets.Sheet1[refArr[1] + refArr[2]] != null){
              nameRanges[nameRangesRaw[i].Name] = sheet.Sheets.Sheet1[refArr[1] + refArr[2]].w;
              }
            }
            var rows = {};
            for (var i = 0, len = Object.keys(sheet.Sheets.Sheet1).length; i < len; i++) {
              if (i > 1) {
                var rowNumber = Object.keys(sheet.Sheets.Sheet1)[i].substr(1);

                if (rows[rowNumber] == undefined) {
                  rows[rowNumber] = {};
                }
                if(sheet.Sheets.Sheet1[Object.keys(sheet.Sheets.Sheet1)[i]].w != null){
                rows[rowNumber][Object.keys(sheet.Sheets.Sheet1)[i]] = sheet.Sheets.Sheet1[Object.keys(sheet.Sheets.Sheet1)[i]].w
              }
              }
            }
            var headers = [];
            var arr = [];
            for (var i = 0, len = Object.keys(rows["2"]).length; i < len; i++) {
              headers.push(rows["2"][Object.keys(rows["2"])[i]]);
            }
            for (var i = 3, len = Object.keys(rows).length; i < len; i++) {
              var rowObj = {
                userId: userId,
                portfolioId: portfolioId,
                portfolioItemId: portfolioItemId
              };
              var number = i.toString();
              if(rows[number] != null){
              for (var i2 = 0, len2 = Object.keys(rows[number]).length; i2 < len2; i2++) {
                var cell = Object.keys(rows[number])[i2];

                var letter = cell.charAt(0);
                var header;
                if (letter == 'A') {
                  header = headers[0]
                }
                if (letter == 'B') {
                  header = headers[1]
                }
                if (letter == 'C') {
                  header = headers[2]
                }
                if (letter == 'D') {
                  header = headers[3]
                }
                if (letter == 'E') {
                  header = headers[4]
                }
                if (letter == 'F') {
                  header = headers[5]
                }
                if (letter == 'G') {
                  header = headers[6]
                }
                if (letter == 'H') {
                  header = headers[7]
                }
                if (letter == 'I') {
                  header = headers[8]
                }
                if (letter == 'J') {
                  header = headers[9]
                }
                if (letter == 'K') {
                  header = headers[10]
                }
                if (letter == 'L') {
                  header = headers[11]
                }
                if (letter == 'M') {
                  header = headers[12]
                }
                if (letter == 'N') {
                  header = headers[13]
                }
                if (letter == 'O') {
                  header = headers[14]
                }
                rowObj[header] = rows[number][Object.keys(rows[number])[i2]]
              }
            }
              arr.push(rowObj);
            }
            var basicDetailObj = {
              userId: userId,
              portfolioId: portfolioId,
              portfolioItemId:portfolioItemId,
              title: nameRanges.Title,
              imgUrl:nameRanges.ImgUrl
            }


            MongoClient.connect(URL, function(err, db) {
              if (err)
                throw err;
              var portfolioItems = db.collection('portfolioItems');
              var collection = db.collection('uploadData');
              var properties = db.collection('properties');
              properties.remove({portfolioItemId:portfolioItemId});
              properties.insert(basicDetailObj)
              collection.remove({portfolioItemId:portfolioItemId});
              portfolioItems.update({_id:ObjectId(portfolioItemId)},{$set:{lastUpdated:date}})
              collection.insert(arr);
              res.json(arr);
            })
          });
      });

}

exports.GetFilename = function(req,res){
  var id = req.body.portfolioItemId;
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection('portfolioItems');
    collection.findOne({_id:ObjectId(id)}, function(err,result){
      if (err)
        throw err;

      res.json(result);
    })



  })
}
exports.ImportNewExcel_old = function(req,res){

  upload(req,res,function(err){
    var userId = req.body.userId;
    var portfolioId = req.body.portfolioId;
    var date = new Date;

    mkdirp('./uploads/'+userId+'/'+portfolioId, function(err) {
      var dir = userId + '/' + portfolioId
      var filename = req.file.filename;
      fs.move('./tmp/' + filename, './uploads/' + dir + '/' + filename, function (err) {
        if (err) {

            res.status(401).json({
              errors: {
                form: "File Exists"
              }
            });
        }
        MongoClient.connect(URL, function(err,db){
          if(err)
            throw err;
          var collection = db.collection('portfolioItems');
          var portfolioItemObj = {
            userId:userId,
            portfolioId:portfolioId,
            name:filename,
            lastUpdated:date
          }
          collection.insert(portfolioItemObj, function(err,result){
            if(err)
              throw err;
              var portfolioItemId = result.insertedIds[0].toString();
              var headerRow = '2';
              var sheetName = 'Sheet1';

              //extract Data
              workbook.xlsx.readFile('./uploads/' + dir + '/' + filename).then(function() {

                var worksheet = workbook.getWorksheet(sheetName); //Grab all data from one sheet in excel doc
                var sheet2 = JSON.parse(CircularJSON.stringify(worksheet)); //extract parseable data from workbook
                var arr = [];
                var headers = []
                for (var i = 0, len = sheet2._rows.length; i < len; i++) { //cycle through sheet rows

                  var rowObj = {userId:userId, portfolioId:portfolioId,portfolioItemId:portfolioItemId}; //create row object for data
                  if (sheet2._rows[i]._cells != null) { //cycle through cells in each row
                    for (var i2 = 0, len2 = sheet2._rows[i]._cells.length; i2 < len2; i2++) {
                      if (sheet2._rows[i]._cells[i2] != null) {

                      var cell = sheet2._rows[i]._cells[i2]._value.model.address;
                      if (cell.indexOf(headerRow) != -1 && cell.length == 2) {
                        headers.push(sheet2._rows[i]._cells[i2]._value.model.value);
                      }
                      var letter = cell.charAt(0);
                      var header;
                      if (letter == 'A') {
                        header = headers[0]
                      }
                      if (letter == 'B') {
                        header = headers[1]
                      }
                      if (letter == 'C') {
                        header = headers[2]
                      }
                      if (letter == 'D') {
                        header = headers[3]
                      }
                      if (letter == 'E') {
                        header = headers[4]
                      }
                      if (letter == 'F') {
                        header = headers[5]
                      }
                      if (letter == 'G') {
                        header = headers[6]
                      }
                      if (letter == 'H') {
                        header = headers[7]
                      }
                      if (letter == 'I') {
                        header = headers[8]
                      }
                      if (letter == 'J') {
                        header = headers[9]
                      }
                      if (letter == 'K') {
                        header = headers[10]
                      }
                      if (letter == 'L') {
                        header = headers[11]
                      }
                      if (letter == 'M') {
                        header = headers[12]
                      }
                      if (letter == 'N') {
                        header = headers[13]
                      }
                      if (letter == 'O') {
                        header = headers[14]
                      }

                      if (sheet2._rows[i]._cells[i2]._value.model.value === undefined) {
                        if (sheet2._rows[i]._cells[i2]._value.model.result === undefined) {
                          rowObj[header] = '--';
                        } else {
                          rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.result;
                        }

                      } else {

                        //start

                        //end
                        if(sheet2._rows[i]._cells[i2]._value.model.style != null && sheet2._rows[i]._cells[i2]._value.model.style.numFmt != null){
                          var numFormat = sheet2._rows[i]._cells[i2]._value.model.style.numFmt;
                          if(numFormat.indexOf('$') > -1){
                              rowObj[header] = '$' + sheet2._rows[i]._cells[i2]._value.model.value.formatMoney(2);
                          }
                          if(numFormat.indexOf('%') > -1){

                              rowObj[header] = '%' + (Math.round(sheet2._rows[i]._cells[i2]._value.model.value * 100));
                          }
                          if(numFormat.indexOf('$') < -1 && numFormat.indexOf('%') < -1){
                              rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
                          }
                        }else{
                        rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
                        }

                        if(sheet2._rows[i]._cells[i2]._value.model.style != null &&  sheet2._rows[i]._cells[i2]._value.model.style.toString().indexOf('~') > -1){
                          var styleArr = sheet2._rows[i]._cells[i2]._value.model.style.toString().split('~');
                          var styleLetter;

                          if(styleArr[4] == 0){
                            styleLetter = 'A';
                          }
                          if(styleArr[4] == 1){
                            styleLetter = 'B';
                          }
                          if(styleArr[4] == 2){
                            styleLetter = 'C';
                          }
                          if(styleArr[4] == 3){
                            styleLetter = 'D';
                          }
                          if(styleArr[4] == 4){
                            styleLetter = 'E';
                          }
                          if(styleArr[4] == 5){
                            styleLetter = 'F';
                          }
                          if(styleArr[4] == 6){
                            styleLetter = 'G';
                          }
                          if(styleArr[4] == 7){
                            styleLetter = 'H';
                          }

                          var getCell = worksheet.getCell(styleLetter + (parseInt(styleArr[2]) + 1)).style;
                          if(getCell.numFmt != null){
                            var tempNumFormat = JSON.parse(CircularJSON.stringify(getCell.numFmt));
                            if(tempNumFormat.indexOf('$') > -1){
                                rowObj[header] = '$' + sheet2._rows[i]._cells[i2]._value.model.value.formatMoney(2);
                            }
                            if(tempNumFormat.indexOf('%') > -1){
                                rowObj[header] = '%' + (Math.round(sheet2._rows[i]._cells[i2]._value.model.value * 100));
                            }

                          }


                        }
                      }
                    }
                  }
                  }
                  if (rowObj['CB ID'] != '--') {
                    arr.push(rowObj);
                  } else {

                  }
                }
                //sheet 2
                var basicSheet = workbook.getWorksheet('Sheet2');
                var basicSheet2 = JSON.parse(CircularJSON.stringify(basicSheet));
                var basicDetailObj = {userId:userId, portfolioId:portfolioId, portfolioItemId}
                for (var i = 0, len = basicSheet2._rows.length; i < len; i++) {
                  if (basicSheet2._rows[i]._cells != null) { //cycle through cells in each row
                    for (var i2 = 0, len2 = basicSheet2._rows[i]._cells.length; i2 < len2; i2++) {
                      var cell = basicSheet2._rows[i]._cells[i2]._value.model.address;

                      if(cell == 'A2'){
                        basicDetailObj['title'] = basicSheet2._rows[i]._cells[i2]._value.model.value;
                      }
                      if(cell == 'B2'){
                        basicDetailObj['imgUrl'] = basicSheet2._rows[i]._cells[i2]._value.model.value;
                      }
                    }
                  }
                }

                MongoClient.connect(URL, function(err, db) {
                  if (err)
                    throw err;

                  var collection = db.collection('uploadData');
                  var collection2 = db.collection('properties');

                  collection2.remove({portfolioItemId:portfolioItemId})
                  collection2.insert(basicDetailObj);
                  collection.remove({portfolioItemId:portfolioItemId});

                  collection.insert(arr);
                  res.json(arr);

                })
              });


          });
          db.close();
        })










    });
    })
  })

}
exports.UpdateNewExcel_old = function(req,res){

  upload(req,res,function(err){
    var userId = req.body.userId;
    var portfolioId = req.body.portfolioId;
    var portfolioItemId = req.body.portfolioItemId;
    var date = new Date;
      var dir = userId + '/' + portfolioId
      var filename = req.body.filename;
      fs.move('./tmp/' + req.file.filename, './uploads/' + dir + '/' + filename,{ overwrite: true }, function (err) {
        if (err) {
          console.log(err);
            res.status(401).json({
              errors: {
                form: "File Exists"
              }
            });
        }
        var headerRow = '2';
        var sheetName = 'Sheet1';

        //extract Data
        workbook.xlsx.readFile('./uploads/' + dir + '/' + filename).then(function() {

          var worksheet = workbook.getWorksheet(sheetName); //Grab all data from one sheet in excel doc
          var sheet2 = JSON.parse(CircularJSON.stringify(worksheet)); //extract parseable data from workbook
          var arr = [];
          var headers = []
          for (var i = 0, len = sheet2._rows.length; i < len; i++) { //cycle through sheet rows

            var rowObj = {userId:userId, portfolioId:portfolioId,portfolioItemId:portfolioItemId}; //create row object for data
            if (sheet2._rows[i]._cells != null) { //cycle through cells in each row
              for (var i2 = 0, len2 = sheet2._rows[i]._cells.length; i2 < len2; i2++) {
                if (sheet2._rows[i]._cells[i2] != null) {

                var cell = sheet2._rows[i]._cells[i2]._value.model.address;
                if (cell.indexOf(headerRow) != -1 && cell.length == 2) {
                  headers.push(sheet2._rows[i]._cells[i2]._value.model.value);
                }
                var letter = cell.charAt(0);
                var header;
                if (letter == 'A') {
                  header = headers[0]
                }
                if (letter == 'B') {
                  header = headers[1]
                }
                if (letter == 'C') {
                  header = headers[2]
                }
                if (letter == 'D') {
                  header = headers[3]
                }
                if (letter == 'E') {
                  header = headers[4]
                }
                if (letter == 'F') {
                  header = headers[5]
                }
                if (letter == 'G') {
                  header = headers[6]
                }
                if (letter == 'H') {
                  header = headers[7]
                }
                if (letter == 'I') {
                  header = headers[8]
                }
                if (letter == 'J') {
                  header = headers[9]
                }
                if (letter == 'K') {
                  header = headers[10]
                }
                if (letter == 'L') {
                  header = headers[11]
                }
                if (letter == 'M') {
                  header = headers[12]
                }
                if (letter == 'N') {
                  header = headers[13]
                }
                if (letter == 'O') {
                  header = headers[14]
                }

                if (sheet2._rows[i]._cells[i2]._value.model.value === undefined) {
                  if (sheet2._rows[i]._cells[i2]._value.model.result === undefined) {
                    rowObj[header] = '--';
                  } else {
                    rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.result;
                  }

                } else {

                  //start

                  //end
                  if(sheet2._rows[i]._cells[i2]._value.model.style != null && sheet2._rows[i]._cells[i2]._value.model.style.numFmt != null){
                    var numFormat = sheet2._rows[i]._cells[i2]._value.model.style.numFmt;
                    if(numFormat.indexOf('$') > -1){
                        rowObj[header] = '$' + sheet2._rows[i]._cells[i2]._value.model.value.formatMoney(2);
                    }
                    if(numFormat.indexOf('%') > -1){

                        rowObj[header] = '%' + (Math.round(sheet2._rows[i]._cells[i2]._value.model.value * 100));
                    }
                    if(numFormat.indexOf('$') < -1 && numFormat.indexOf('%') < -1){
                        rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
                    }
                  }else{
                  rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
                  }

                  if(sheet2._rows[i]._cells[i2]._value.model.style != null &&  sheet2._rows[i]._cells[i2]._value.model.style.toString().indexOf('~') > -1){
                    var styleArr = sheet2._rows[i]._cells[i2]._value.model.style.toString().split('~');
                    var styleLetter;

                    if(styleArr[4] == 0){
                      styleLetter = 'A';
                    }
                    if(styleArr[4] == 1){
                      styleLetter = 'B';
                    }
                    if(styleArr[4] == 2){
                      styleLetter = 'C';
                    }
                    if(styleArr[4] == 3){
                      styleLetter = 'D';
                    }
                    if(styleArr[4] == 4){
                      styleLetter = 'E';
                    }
                    if(styleArr[4] == 5){
                      styleLetter = 'F';
                    }
                    if(styleArr[4] == 6){
                      styleLetter = 'G';
                    }
                    if(styleArr[4] == 7){
                      styleLetter = 'H';
                    }

                    var getCell = worksheet.getCell(styleLetter + (parseInt(styleArr[2]) + 1)).style;
                    if(getCell.numFmt != null){
                      var tempNumFormat = JSON.parse(CircularJSON.stringify(getCell.numFmt));
                      if(tempNumFormat.indexOf('$') > -1){
                          rowObj[header] = '$' + sheet2._rows[i]._cells[i2]._value.model.value.formatMoney(2);
                      }
                      if(tempNumFormat.indexOf('%') > -1){
                          rowObj[header] = '%' + (Math.round(sheet2._rows[i]._cells[i2]._value.model.value * 100));
                      }

                    }


                  }
                }
              }
            }
            }
            if (rowObj['CB ID'] != '--') {
              arr.push(rowObj);
            } else {

            }
          }
          //sheet 2
          var basicSheet = workbook.getWorksheet('Sheet2');
          var basicSheet2 = JSON.parse(CircularJSON.stringify(basicSheet));
          var basicDetailObj = {userId:userId, portfolioId:portfolioId, portfolioItemId}
          for (var i = 0, len = basicSheet2._rows.length; i < len; i++) {
            if (basicSheet2._rows[i]._cells != null) { //cycle through cells in each row
              for (var i2 = 0, len2 = basicSheet2._rows[i]._cells.length; i2 < len2; i2++) {
                var cell = basicSheet2._rows[i]._cells[i2]._value.model.address;

                if(cell == 'A2'){
                  basicDetailObj['title'] = basicSheet2._rows[i]._cells[i2]._value.model.value;
                }
                if(cell == 'B2'){
                  basicDetailObj['imgUrl'] = basicSheet2._rows[i]._cells[i2]._value.model.value;
                }
              }
            }
          }

          MongoClient.connect(URL, function(err, db) {
            if (err)
              throw err;
            var portfolioItems = db.collection('portfolioItems');
            var collection = db.collection('uploadData');
            collection.remove({portfolioItemId:portfolioItemId});
            portfolioItems.update({_id:ObjectId(portfolioItemId)},{$set:{lastUpdated:date}})
            collection.insert(arr);
            res.json(arr);

          })
        });










    });

  })

}
exports.DeleteNewExcel = function(req,res){
  var dir = './uploads/' + req.body.userId + '/' + req.body.portfolioId + '/' + req.body.filename;
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var portfolioItems = db.collection("portfolioItems")
    var uploadData = db.collection("uploadData")
    portfolioItems.remove({userId:req.body.userId, portfolioId:req.body.portfolioId, name:filename});
    uploadData.remove({portfolioItemId:req.body.portfolioItemId});
  })
  fs.unlink(dir, function(res){
    res.send ({
      status: "200",
      responseType: "string",
      response: "success"
    });
  })
}
exports.DownloadNewExcel = function(req,res){

  var file = __dirname+'/uploads/'+req.body.userId+'/'+req.body.portfolioId+'/'+req.body.filename;
  res.download(file);
}

exports.UploadPortfolioData = function(req,res){

  var userId = req.body.userId;
  var portfolioId = req.body.portfolioId;
  var fileName = portfolioId;
  res.send({filename:fileName});
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
      //var datetimestamp = Date.now();
      cb(null, fileName + '.xlsx')
    }
  });

  var upload = multer({
    storage: storage,
    onError : function(err, next) {

          next(err);
        }
      }).single('file');

  upload(req, res, function(err) {

  })

}
exports.ImportClosingData = function(req, res) {

  upload2(req, res, function(err) {

    var userId = req.body.userId;
    var portfolioId = req.body.portfolioId;
    var headerRow = '2';
    var databaseName = 'closingCollection';
    var sheetName = 'Sheet1';

    workbook.xlsx.readFile(req.file.path).then(function() {

      var worksheet = workbook.getWorksheet(sheetName); //Grab all data from one sheet in excel doc
      var sheet2 = JSON.parse(CircularJSON.stringify(worksheet)); //extract parseable data from workbook
      var arr = [];
      var headers = []
      for (var i = 0, len = sheet2._rows.length; i < len; i++) { //cycle through sheet rows

        var rowObj = {}; //create row object for data
        if (sheet2._rows[i]._cells != null) { //cycle through cells in each row
          for (var i2 = 0, len2 = sheet2._rows[i]._cells.length; i2 < len2; i2++) {
            if (sheet2._rows[i]._cells[i2] != null) {

            var cell = sheet2._rows[i]._cells[i2]._value.model.address;
            if (cell.indexOf(headerRow) != -1 && cell.length == 2) {
              headers.push(sheet2._rows[i]._cells[i2]._value.model.value);
            }
            var letter = cell.charAt(0);
            var header;
            if (letter == 'A') {
              header = headers[0]
            }
            if (letter == 'B') {
              header = headers[1]
            }
            if (letter == 'C') {
              header = headers[2]
            }
            if (letter == 'D') {
              header = headers[3]
            }
            if (letter == 'E') {
              header = headers[4]
            }
            if (letter == 'F') {
              header = headers[5]
            }
            if (letter == 'G') {
              header = headers[6]
            }
            if (letter == 'H') {
              header = headers[7]
            }
            if (letter == 'I') {
              header = headers[8]
            }
            if (letter == 'J') {
              header = headers[9]
            }
            if (letter == 'K') {
              header = headers[10]
            }
            if (letter == 'L') {
              header = headers[11]
            }
            if (letter == 'M') {
              header = headers[12]
            }
            if (letter == 'N') {
              header = headers[13]
            }
            if (letter == 'O') {
              header = headers[14]
            }

            if (sheet2._rows[i]._cells[i2]._value.model.value === undefined) {
              if (sheet2._rows[i]._cells[i2]._value.model.result === undefined) {
                rowObj[header] = '--';
              } else {
                rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.result;
              }

            } else {

              //start

              //end
              if(sheet2._rows[i]._cells[i2]._value.model.style != null && sheet2._rows[i]._cells[i2]._value.model.style.numFmt != null){
                var numFormat = sheet2._rows[i]._cells[i2]._value.model.style.numFmt;
                if(numFormat.indexOf('$') > -1){
                    rowObj[header] = '$' + sheet2._rows[i]._cells[i2]._value.model.value.formatMoney(2);
                }
                if(numFormat.indexOf('%') > -1){
                  //console.log(sheet2._rows[i]._cells[i2]._value.model.value);
                    rowObj[header] = '%' + (Math.round(sheet2._rows[i]._cells[i2]._value.model.value * 100));
                }
                if(numFormat.indexOf('$') < -1 && numFormat.indexOf('%') < -1){
                    rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
                }
              }else{
              rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
              }

              if(sheet2._rows[i]._cells[i2]._value.model.style != null &&  sheet2._rows[i]._cells[i2]._value.model.style.toString().indexOf('~') > -1){
                var styleArr = sheet2._rows[i]._cells[i2]._value.model.style.toString().split('~');
                var styleLetter;

                if(styleArr[4] == 0){
                  styleLetter = 'A';
                }
                if(styleArr[4] == 1){
                  styleLetter = 'B';
                }
                if(styleArr[4] == 2){
                  styleLetter = 'C';
                }
                if(styleArr[4] == 3){
                  styleLetter = 'D';
                }
                if(styleArr[4] == 4){
                  styleLetter = 'E';
                }
                if(styleArr[4] == 5){
                  styleLetter = 'F';
                }
                if(styleArr[4] == 6){
                  styleLetter = 'G';
                }
                if(styleArr[4] == 7){
                  styleLetter = 'H';
                }

                var getCell = worksheet.getCell(styleLetter + (parseInt(styleArr[2]) + 1)).style;
                if(getCell.numFmt != null){
                  var tempNumFormat = JSON.parse(CircularJSON.stringify(getCell.numFmt));
                  if(tempNumFormat.indexOf('$') > -1){
                      rowObj[header] = '$' + sheet2._rows[i]._cells[i2]._value.model.value.formatMoney(2);
                  }
                  if(tempNumFormat.indexOf('%') > -1){
                      rowObj[header] = '%' + (Math.round(sheet2._rows[i]._cells[i2]._value.model.value * 100));
                  }

                }


              }
            }
          }
        }
        }
        if (rowObj['CB ID'] != '--') {
          arr.push(rowObj);
        } else {

        }
      }
      //sheet 2
      var basicSheet = workbook.getWorksheet('Sheet2');
      var basicSheet2 = JSON.parse(CircularJSON.stringify(basicSheet));
      var basicDetailObj = {userId:userId, portfolioId:portfolioId}
      for (var i = 0, len = basicSheet2._rows.length; i < len; i++) {
        if (basicSheet2._rows[i]._cells != null) { //cycle through cells in each row
          for (var i2 = 0, len2 = basicSheet2._rows[i]._cells.length; i2 < len2; i2++) {
            var cell = basicSheet2._rows[i]._cells[i2]._value.model.address;
            //console.log(cell);
            if(cell == 'A2'){
              basicDetailObj['title'] = basicSheet2._rows[i]._cells[i2]._value.model.value;
            }
            if(cell == 'B2'){
              basicDetailObj['imgUrl'] = basicSheet2._rows[i]._cells[i2]._value.model.value;
            }
          }
        }
      }

      MongoClient.connect(URL, function(err, db) {
        if (err)
          throw err;

        var collection = db.collection(databaseName);
        var collection2 = db.collection('properties');
        collection2.remove({userId:userId})
        collection2.insert(basicDetailObj);
        collection.remove();

        collection.insert(arr);
        res.json(arr);

      })
    });

  })
}
exports.AddPortfolio = function(req,res){
  MongoClient.connect(URL, function(err,db){
    if(err)
      throw err;
    var collection = db.collection('portfolios');
    collection.insert(req.body, function(err,result){
      if(err)
        throw err;
      res.json(result);
    });
    db.close();
  })
}
exports.GetPortfolioItems = function(req,res){
  var portfolioId = req.body.portfolioId

  MongoClient.connect(URL, function(err,db){
    if(err)
      throw err;
    var collection = db.collection('portfolioItems');
    collection.find({portfolioId:portfolioId}).toArray(function(err,result){
      if(err)
        throw err;

      res.json(result);

    });
    db.close();
  })
}
exports.GetPortfolioInfo = function(req,res){
  var portfolioId = req.body.portfolioId

  MongoClient.connect(URL, function(err,db){
    if(err)
      throw err;
    var collection = db.collection('portfolios');
    collection.find({_id:ObjectId(portfolioId)}).toArray(function(err,result){
      if(err)
        throw err;

      res.json(result);

    });
    db.close();
  })
}
exports.DeletePortfolio= function(req,res){
  var portfolioId = req.body.portfolioId;
  MongoClient.connect(URL, function(err,db){
    if(err)
      throw err;
    var collection = db.collection('portfolios');
    collection.deleteOne({_id:ObjectId(portfolioId)}, function(err,result){
      if (err)
        throw err;
      res.json(result);
    });
    db.close();
  })
}
exports.SharePortfolio = function(req,res){
  var userId = req.body.userId;
  var shareEmail = req.body.shareEmail;
  var portfolioId = req.body.portfolioId;

  MongoClient.connect(URL, function(err,db){
    if(err)
      throw err;
    var users = db.collection('users');
    var portfolios = db.collection('portfolios');
    users.find({email:shareEmail}).toArray(function(err,result){
      if (err)
        throw err;

      if(result.length < 1){
        res.status(401).json({
          shareErrors: {
            form: "User Email Does Not Exist"
          }
        });
      }else{
        var shareId = result[0];
        var data = {
          id:result[0]._id.toString(),
          username:result[0].username,
          email:result[0].email
        }

        portfolios.update({_id:ObjectId(portfolioId)},
          {
            $push:{
              sharedUsers: data
            }
          },function(err, result){
            if(err)
              throw err;
            res.json(result)
            db.close();
          })
      }

      res.json(result);
    });

  })
}
exports.UnsharePortfolio = function(req,res){
  var userId = req.body.userId;
  var shareEmail = req.body.shareEmail;
  var portfolioId = req.body.portfolioId;

  MongoClient.connect(URL, function(err,db){
    if(err)
      throw err;

    var portfolios = db.collection('portfolios');
    portfolios.update({_id:ObjectId(portfolioId)},
      {
        $pull:{
          sharedUsers: {email:shareEmail}
        }
      },function(err, result){
        if(err)
          throw err;
        res.json(result)
        db.close();
      })

  })
}
exports.GetSharedUsers = function(req,res){
  var portfolioId = req.body.portfolioId;
  MongoClient.connect(URL, function(err,db){
    if(err)
      throw err;
    var portfolios = db.collection('portfolios');
    portfolios.findOne({_id:ObjectId(portfolioId)},function(err,result){
      if(err)
        throw err;
      res.json(result.sharedUsers);
    })
  })
}
exports.UploadData = function(req, res) {

  var headerRow = req.body.headerRow;
  var databaseName = req.body.databaseName;
  var sheetName = req.body.sheetName;
  var userId = req.body.userId;

  upload(req, res, function(err) {

    workbook.xlsx.readFile(req.file.path).then(function() {

      var worksheet = workbook.getWorksheet(sheetName); //Grab all data from one sheet in excel doc
      var sheet2 = JSON.parse(CircularJSON.stringify(worksheet)); //extract parseable data from workbook
      var arr = [];
      var headers = []
      for (var i = 0, len = sheet2._rows.length; i < len; i++) { //cycle through sheet rows
        var rowObj = { userId:userId }; //create row object for data
        if (sheet2._rows[i]._cells !== null && sheet2._rows[i]._cells !== undefined) { //cycle through cells in each row
          for (var i2 = 0, len2 = sheet2._rows[i]._cells.length; i2 < len2; i2++) {
            var cell = sheet2._rows[i]._cells[i2]._value.model.address;
            if (cell.indexOf(headerRow) !== -1 && cell.length == 2) {
              headers.push(sheet2._rows[i]._cells[i2]._value.model.value);
            }
            var letter = cell.charAt(0);
            var header;
            if (letter == 'A') {
              header = headers[0]
            }
            if (letter == 'B') {
              header = headers[1]
            }
            if (letter == 'C') {
              header = headers[2]
            }
            if (letter == 'D') {
              header = headers[3]
            }
            if (letter == 'E') {
              header = headers[4]
            }
            if (letter == 'F') {
              header = headers[5]
            }
            if (letter == 'G') {
              header = headers[6]
            }
            if (letter == 'H') {
              header = headers[7]
            }
            if (letter == 'I') {
              header = headers[8]
            }
            if (letter == 'J') {
              header = headers[9]
            }
            if (letter == 'K') {
              header = headers[10]
            }
            if (letter == 'L') {
              header = headers[11]
            }
            if (letter == 'M') {
              header = headers[12]
            }
            if (letter == 'N') {
              header = headers[13]
            }
            if (letter == 'O') {
              header = headers[14]
            }

            if (sheet2._rows[i]._cells[i2]._value.model.value === undefined) {
              if (sheet2._rows[i]._cells[i2]._value.model.result === undefined) {
                rowObj[header] = '--';
              } else {
                rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.result;
              }

            } else {
              rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
            }
          }
        }
        if (rowObj['CB ID'] != '--') {
          arr.push(rowObj);

        } else {

        }
      }
      MongoClient.connect(URL, function(err, db) {
        if (err)
          throw err;

        var collection = db.collection(databaseName);
        collection.remove();

        collection.insert(arr);
        res.json(arr);

      })
    });

  })
}
exports.DownloadClosingExcel = function(req,res){
  var file = __dirname + '/uploads/ClosingExcel.xlsx';

  res.download(file);
}
exports.GetPropertyInfo = function(req,res){
  var userId = req.body.userId;
  var portfolioItemId = req.body.portfolioItemId;
  MongoClient.connect(URL, function(err, db){
    if(err)
      throw err;
      var collection = db.collection('properties');
      collection.find({'portfolioItemId':portfolioItemId}).toArray(function(err,result){
        if(err)
          throw err;
        res.send(result);
        db.close();
      })
  })
}
exports.GetBlock = function(req, res) {
  var majorCategory = req.body.majorCategory;
  var portfolioItemId = req.body.portfolioItemId;
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("uploadData")

    collection.find({"Major Category": majorCategory, portfolioItemId:portfolioItemId}).toArray(function(err, result) {
      if (err)
        throw err;

      res.send(result);
      db.close();
    })

  })
}
exports.GetHeaders = function(req, res) {
  function removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array
  }
  var portfolioItemId = req.body.portfolioItemId;

  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("uploadData")

    collection.find({portfolioItemId:portfolioItemId}).toArray(function(err, result) {

      var headerArr = [];
      for (var i = 0, len = result.length; i < len; i++) {
        headerArr.push(result[i]['Major Category'])
      }

      if (err)
        throw err;
      res.json(removeDuplicates(headerArr));
      //db.close();
    })

  })
}
exports.GetTabs = function(req, res) {
  function removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array
  }
  var portfolioItemId = req.body.portfolioItemId;

  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("uploadData")

    collection.find({portfolioItemId:portfolioItemId}).toArray(function(err, result) {

      var headerArr = [];
      for (var i = 0, len = result.length; i < len; i++) {
        headerArr.push(result[i]['Tab Name'])
      }

      if (err)
        throw err;
      res.json(removeDuplicates(headerArr));
      //db.close();
    })

  })
}
exports.LoginCheck = function(req, res) {
  const {username, password} = req.body;
  MongoClient.connect(URL, function(err, db) {
    if (err)
      return

    var collection = db.collection('users')

    collection.findOne({
      "username": username
    }, function(err, result) {
      if (result == null) {
        res.status(401).json({
          errors: {
            form: "Username Does Not Exist"
          }
        });
        db.close()
      } else {
        if (result.password === password) {

          const token = jwt.sign({
            id: result._id,
            username: result.username
          }, config.jwtSecret);

          res.json({token})
        } else {
          res.status(401).json({
            errors: {
              form: "Wrong Password"
            }
          });
        }
        //db.close()
      }

    })

  })

  // db.collection('users').find({username:username}).toArray(function(err,result){
  //   if (err) throw err

  //   res.status(401).json({errors: {form : result } });
  // })

  //res.status(401).json({errors: {form : "Invalid Credentials" } });

};
exports.excelData = function(req, res) {

};
exports.getApplications = function(req, res) {
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("applications")

    collection.find({}).toArray(function(err, result) {
      if (err)
        throw err;

      res.send(result);
      db.close();
    })

  })
};
exports.Users = function(req, res) {
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("users")

    collection.find({}).toArray(function(err, result) {
      if (err)
        throw err;
      res.send(result);
      db.close();
    })

  })
};
exports.GetPortfolios = function(req, res) {
  var userId = req.params.id;
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("portfolios")

    collection.find({userId: userId}).toArray(function(err, result) {
      if (err)
        throw err;

      res.send(result);
      db.close();
    })

  })
};
exports.ConfirmEmail = function(req, res) {
  var ObjectId = require('mongodb').ObjectId;
  var token = req.params.token;
  const _id = jwt.verify(token, config.jwtSecret);
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;
    var collection = db.collection('users');

    //res.send(_id);

    collection.updateOne({
      _id: ObjectId(_id.id)
    }, {
      $set: {
        confirmed: true
      }
    }, function(err, result) {
      if (err)
        throw err;

      res.send(result);
    })
  });
}
exports.SignUpUser = function(req, res) {

  const {username, email, password} = req.body;
  var EMAIL_SECRET;
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("users")

    collection.find({email: email}).toArray(function(err, result) {
      var firstResult = result;
      collection.find({username: username}).toArray(function(err, result) {
        if (result.length < 1 && firstResult.length < 1) {
          var user = {
            username: username,
            email: email,
            password: password,
            confirmed: false,
            isAdmin: false
          };
          collection.insert(user, function(err) {
            const token = jwt.sign({
              id: user._id,
              username: user.username,
              email: user.email
            }, config.jwtSecret);

            const emailToken = jwt.sign({
              id: user._id
            }, config.jwtSecret, {expiresIn: '1d'});

            var url = `http://localhost:9000/confirmation/${emailToken}`;
            const emailOutput = `
              <div style="background:#f8f8f8; text-align: center; width:100%; padding:30px 15px;box-sizing: border-box;">
            	<div style="max-width: 500px; width:100%; background:#fff; padding:15px; text-align: center;display: inline-block; border:solid 1px #eaeaea; border-radius: 3px;box-sizing: border-box;">
            	<div style="">
            		<img src="https://commonbrain.io/img/logo_color_with_line.png" alt="" height="100px">
            	</div>
            		<div style="color:#000;  font-size: 12pt; font-family: Arial; font-weight: bold; margin:10px 0px; display: inline-block">Welcome To CommonBrain<sup>TM</sup></div>
            		<div style=" font-size: 10pt;
            		color:#808080;
            		font-family:Arial;
            		">
            			Thank you for joining CommonBrain!  Your email has been setup and you are ready to start using our software.  If you need any help, click the button below to get help quickly and easily!
            		</div>
            		<a target="_blank" href="http://localhost:9000/confirmation/${emailToken}"><div style="background:#66d0f7; color:#fff; font-size: 12pt;
            		font-family:Arial; display:inline-block; padding:7px 15px; border-radius:3px; margin-top:25px;">
            			Confirm Your Account
            		</div></a>
            	</div><br>
            	<div style="display: inline-block; font-size: 10pt;
            		font-family:Arial; color:#AFAFAF; margin-top:15px">
            			CommonBrain | 77900 Country Club Dr | Palm Desert, CA 92211
            		</div>
                </div>
              `;
            let mailOptions = {
              from: '"CommonBrain Support" <support@commonbrain.io>', // sender address
              to: user.email, // list of receivers
              subject: 'Welcome to CommonBrain!', // Subject line
              text: 'Hello world?', // plain text body
              html: emailOutput // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

            res.json({token})
          })

        } else {
          if (result.length >= 1) {
            res.status(401).json({
              errors: {
                form: "Username exists"
              }
            });
          }
          if (firstResult.length >= 1) {
            res.status(401).json({
              errors: {
                form: "Email is already in use"
              }
            });
          }
        }
      })
    })
  })

}
