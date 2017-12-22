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
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.originalname.split('.')[0] + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

var upload = multer({
  storage: storage,
  onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
    }).single('file');

mongoose.connect('mongodb://iwantmoredexx:Awesomeo21!@cluster0-shard-00-00-l9gyz.mongodb.net:27017,cluster0-shard-00-01-l9gyz.mongodb.net:27017,cluster0-shard-00-02-l9gyz.mongodb.net:27017/commonbrain?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db = mongoose.connection;

exports.ImportExcel = function(req, res) {
  upload(req, res, function(err) {
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
exports.ImportClosingData = function(req, res) {
  upload(req, res, function(err) {
    // if (err) {
    //   res.json({error_code: 1, err_desc: err});
    //   return;
    // }
    // if (!req.file) {
    //   res.json({error_code: 1, err_desc: "No file passed"});
    //   return;
    // }

    workbook.xlsx.readFile(req.file.path).then(function() {
      //  var dataObj = CircularJSON.stringify(data);
      //res.json({form:dataObj})
      var worksheet = workbook.getWorksheet('Sheet1');
      //
      //
      var sheet2 = JSON.parse(CircularJSON.stringify(worksheet));
      var arr = [];
      var headers = []
      //
      for (var i = 0, len = sheet2._rows.length; i < len; i++) {
        var rowObj = {}

        if (sheet2._rows[i]._cells !== null && sheet2._rows[i]._cells !== undefined) {
          for (var i2 = 0, len2 = sheet2._rows[i]._cells.length; i2 < len2; i2++) {
            var cell = sheet2._rows[i]._cells[i2]._value.model.address;
            if (cell.indexOf('2') !== -1 && cell.length == 2) {
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

            if (sheet2._rows[i]._cells[i2]._value.model.value === undefined) {
              if (sheet2._rows[i]._cells[i2]._value.model.result === undefined) {
                rowObj[header] = 'NAP';
              } else {
                rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.result;
              }

            } else {
              rowObj[header] = sheet2._rows[i]._cells[i2]._value.model.value;
            }
          }
        }
        if (rowObj['CB ID'] != 'NAP') {
          arr.push(rowObj);
          //console.log(rowObj);
          //console.log('not empty')
        } else {
          //console.log('empty')
        }

        //  var index = i;
        //  if( sheet2._rows[i]._cells !== null && sheet2._rows[i]._cells !== undefined){
        //
        //  for (var i2 = 0, len2 = sheet2._rows[i]._cells.length; i2 < len2; i2++){
        //     if( sheet2._rows[i]._cells[i2] !== null && sheet2._rows[i]._cells[i2] !== undefined){
        //       var cell = sheet2._rows[i]._cells[i2]._value.model.address;
        //       var Obj = {};
        //       if(sheet2._rows[i]._cells[i2]._value.model.value === undefined){
        //         Obj[cell] = sheet2._rows[i]._cells[i2]._value.model.result;
        //       }else{
        //         Obj[cell] = sheet2._rows[i]._cells[i2]._value.model.value;
        //       }
        //
        //
        //
        //       if(Obj[cell] !== undefined){
        //         arr.push(Obj);
        //       }
        //
        //
        //
        //     }
        //
        // }
        //
        //
        // }

      }
      //res.json(JSON.parse(CircularJSON.stringify(arr)));
      MongoClient.connect(URL, function(err, db) {
        if (err)
          throw err;

        var collection = db.collection("closingCollection")
        collection.remove();

        collection.insert(arr)
        res.json(arr);

      })
    });

  })
}
exports.GetClosingBlock = function(req, res) {
  var majorCategory = req.body.majorCategory;
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("closingCollection")

    collection.find({"Major Category": majorCategory}).toArray(function(err, result) {
      if (err)
        throw err;
      console.log(result);
      res.send(result);
      db.close();
    })

  })
}
exports.GetClosingHeaders = function(req, res) {
  function removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array
  }
  MongoClient.connect(URL, function(err, db) {
    if (err)
      throw err;

    var collection = db.collection("closingCollection")

    collection.find().toArray(function(err, result) {
      var headerArr = [];
      for (var i = 0, len = result.length; i < len; i++) {
        headerArr.push(result[i]['Major Category'])
      }

      if (err)
        throw err;
      res.json(removeDuplicates(headerArr));
      db.close();
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
        //console.log(result);
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
  //   console.log(err);
  //   res.status(401).json({errors: {form : result } });
  // })

  //res.status(401).json({errors: {form : "Invalid Credentials" } });

};
exports.excelData = function(req, res) {
  console.log(req);
  comsole.log(res);
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
      console.log(result);
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
      console.log(result);
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
    //console.log(_id);
    //res.send(_id);
    console.log(_id.id);
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
