var express = require('express')
var fs = require('fs')

var app = express();


app.get('/listusers', function(req, res){

})

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("listening at: " + port);
})