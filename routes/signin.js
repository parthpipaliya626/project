var express = require('express');
// var mongoose = require('mongoose');
var router = express.Router();
var path = require('path');
var jwt = require('jsonwebtoken');
// var userModel = require('../modules/user');
var bcrypt = require('bcryptjs');
var multer = require('multer');


var router = express.Router();


// var user = userModel.find({});

router.use(express.static(__dirname + "./public/"));

  

router.get('/test', function(req, res, next) {
  res.render('test');
});


/* GET users signin listing. */


router.get('/signin', function(req, res, next) {
        res.render('signin');
});




  /* GET users signup listing. */

router.get('/signup', function(req, res, next) {
  res.render('signup');

});

router.post('/signup', function (req, res, next) {
      res.render('signup');

   });


router.get('/', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
