// var http = require('http');
// var fs = require('fs');
// var url = require('url');
var express = require('express')
var app = express();
app.use(express.static('public'));
app.use(function(req, res, next) {
    console.log("Date", Date.now());
    next();
})
app.get('/', function(req, res) {
  res.send("Get Method called")
});
app.post('/', function(req, res) {
    res.send("Post Method called")
  });

  app.all('/secret', function(req, res, next) {
    console.log("Access the secret method");
    next();
  });
  var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })