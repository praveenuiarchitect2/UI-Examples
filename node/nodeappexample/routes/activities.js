var express = require('express');
var router = express.Router();
var mongodbutil = require( './../dbconnect.js' );
var db = mongodbutil.getDb();

router.get('/', (req, res, next) => {  
    db.collection('user').find().toArray((err, results) => {
        if (err) return console.log(err)
            res.send(results)
    });
});

router.post('/', (req, res) => {
  db.collection('user').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/activities')
  })
});

module.exports = router;