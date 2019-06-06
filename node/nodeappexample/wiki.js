var express = require('express');
var router = express.Router();
var db = require('./dbconnect.js');
// Home page route
router.get('/', function(req, res) {
   db.collection('user').find().toArray(function(err, result){
     if(err) throw err;
     res.send(result);
   //  client.close();
   });
//  res.send('Wiki home page');
});

// About page route
router.get('/about', function(req, res) {
  res.send('About this wiki');
});

module.exports = router;