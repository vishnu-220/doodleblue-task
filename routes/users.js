var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var connection = require ('./../db.js');
var bcrypt=require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/logout',function(req,res,next){
  res.sendFile(__dirname + '/views/register.html');
});


module.exports = router;
