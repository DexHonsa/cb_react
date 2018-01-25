var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./config.js');
var api = require('./routes/api');
var multer = require('multer');
var CircularJSON = require('circular-json');
var exphbs = require('express-handlebars');
var nodemailer = require('nodemailer');
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//development options
//app.use('/public', express.static(path.join(__dirname, 'public')));





//production options
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.route('/api/login').post(api.LoginCheck);
app.route('/confirmation/:token').post(api.ConfirmEmail);
app.route('/api/users').post(api.Users);
app.route('/api/user_portfolios/:id').post(api.GetPortfolios);
app.route('/api/import').post(api.ImportExcel);
app.route('/api/sign_up').post(api.SignUpUser);
//application api
app.route('/api/applications').post(api.getApplications);
app.route('/api/uploadData').post(api.UploadData);

//closingData apis
app.route('/api/uploadClosingData').post(api.ImportClosingData);
app.post('/api/DownloadClosingExcel', function(req,res){
  var file = __dirname + '/uploads/ClosingExcel.xlsx';
  console.log(file);
  res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");
       }
   });
})
app.post('/api/downloadNewExcel', function(req,res){

  var file = __dirname+'/uploads/'+req.body.userId+'/'+req.body.portfolioId+'/'+req.body.filename;

  res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");
       }
   });
})
app.post('/api/downloadTemplate', function(req,res){

  var file = __dirname+'/CB_template.xlsx';
  console.log(file);

  res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");
       }
   });
})
app.route('/api/getBlock').post(api.GetBlock);
app.route('/api/getHeaders').post(api.GetHeaders);
app.route('/api/getPropertyInfo').post(api.GetPropertyInfo);
app.route('/api/addPortfolio').post(api.AddPortfolio);
app.route('/api/getPortfolioItems').post(api.GetPortfolioItems);
app.route('/api/getPortfolioInfo').post(api.GetPortfolioInfo);
app.route('/api/deletePortfolio').post(api.DeletePortfolio);
app.route('/api/sharePortfolio').post(api.SharePortfolio);
app.route('/api/getSharedUsers').post(api.GetSharedUsers);
app.route('/api/unsharePortfolio').post(api.UnsharePortfolio);

app.route('/api/uploadPortfolioData').post(api.UploadPortfolioData);

app.route('/api/importBasic').post(api.ImportBasic);
app.route('/api/importTest').post(api.ImportTest);
app.route('/api/importLoan').post(api.ImportLoan);
app.route('/api/importNewExcel').post(api.ImportNewExcel);
app.route('/api/getFilename').post(api.GetFilename);
app.route('/api/deleteNewExcel').post(api.DeleteNewExcel);
app.route('/api/updateNewExcel').post(api.UpdateNewExcel);


app.listen(config.expressPort, function() {
  console.log("Express server listening on port %d in %s mode", config.expressPort, app.settings.env);
});
