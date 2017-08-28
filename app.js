var express = require( "express" );
var http    = require( "http" );
var mysql = require('mysql');
var fs = require("fs");
var app      = express();
var html =require('html');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var connection = require('./db.js');
// var users = require('./routes/users.js');
var url = "mongodb://127.0.0.1:27017/userInfoData";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({secret: "vishnu", saveUninitialized : true, resave : true}));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);

// app.use('/users', users);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/views/register.html');
});
// app.get('/getUsername',function(req,res,next){
// 	res.status(200).send("<b>"+'Hi '+"</b>" + "<b>"+(req.session.username == undefined?"NOT FOUND":req.session.username)+"</b>"+'!!!');
//
// });
app.post('/users/login',function(req,res,next) {
  console.log("login route");
  connection.connect(url, function(err, db) {
  if (err) throw err;
  var query = { email :req.body.email };
  db.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    else {
      var pwd=result[0].password;
        if(pwd==req.body.password){
          console.log("Login success");
          req.session.username=req.body.email;
          res.status = 200;
          res.send("valid_user");
          // return callback(null,"valid_user");
        }
        else {
          console.log("Login failed");
          res.status = 400;
          res.send("invalid_user");
        }
  }
    db.close();
  });
});
});
app.post('/users/signup' ,function(req,res,next) {
  var text;
  // console.log(JSON.stringify(req.body));
  if(req.body.code==""){
    var data = {
      name:req.body.name,
      email:req.body.email,
      password:req.body.newpwd,
      mobile:req.body.mobile,
      code :req.body.code,
      points:25
    };
  }
  else {
  var data = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.newpwd,
    mobile:req.body.mobile,
    code :req.body.code,
    points:50
  };
}
  // console.log(data);
  connection.connect(url, function(err, db) {
    if (err) throw err;

    db.collection("users").insertOne(data, function(err, res) {
      if (err) throw err;
      else {
      console.log("1 document inserted");
      db.close();
      text="ok";
    }
    });
    res.status=200;
    res.send("ok")
});
});
app.get('/getProfile',function(req,res){

  connection.connect(url, function(err, db) {
  if (err) throw err;
  var query = { email :req.session.username };
  db.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    else {
      res.status = 200;
        res.send(result[0]);
  }
    db.close();
  });
});
});
app.post('/updateProfile',function(req,res){
  // console.log(req.body);
  connection.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { email: req.body.email };
    var newvalues = { name: req.body.name, password:req.body.pwd,mobile:req.body.mobile };
  connection.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { email: req.body.email };
    var newvalues = {$set: {name:req.body.name , mobile:req.body.mobile,password:req.body.pwd} };
  db.collection("users").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
          db.close();
        });
     });
    });
    db.close();
  });

app.get('/users/logout',function(req,res){
   req.session.destroy();
  res.status="200";
  res.send("logout");
});
app.get('*', function (req,res){
	res.send('Error: 404, Page not found<br>For your request');
});



app.listen(3000, function() {
   console.log('Express server listening on port ' ,3000);
} );

module.exports = app;
