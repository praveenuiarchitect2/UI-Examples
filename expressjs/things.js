var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
    res.send("Hello world!");
 });
router.post('/', function(req, res){
    res.send("hello post");
});

module.exports = router;
  