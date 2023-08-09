const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
// var userModel = require('../modules/user');
const bcrypt = require('bcryptjs');
const multer = require('multer');




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

// Signup
router.post('/signup', async (req, res) => {
  // const { email, password } = req.body;

       const firstname = req.body.firstName;
       const lastname = req.body.lastName;
       const username = firstname + ' ' + lastname;
       const email= req.body.email;
       const password= req.body.password;
       const confpassword = req.body.confpassword;
//        if(password != confpassword){
//         res.render('signup', { title: 'Password Management System', msg:'Password  not matched!....' });
//        }else{
//          password = bcrypt.hashSync(req.body.password, 10);
//         var userDetails=new userModel({
//          username:username,
//          email:email,
//          password:password   
//   });
//  }
       
//        console.log(userDetails);
//        userDetails.save(function(err,req1){
//          if(err) throw err; 
//          user.exec(function(err,data){
//            if(err) throw err;
//        res.render('signup', { title: 'Password Management System', msg:'User Registered Successfully!...' });
 
//       });
//  });
//   });


  try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const insertQuery = 'INSERT INTO users (email, password) VALUES ($1, $2)';
      const values = [email, hashedPassword];

      await pool.query(insertQuery, values);
      res.redirect('/signup');
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).send('An error occurred.');
  }
});


router.get('/', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
