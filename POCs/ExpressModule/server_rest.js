var express = require('express')
var fs = require('fs')

var app = express();

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/listusers', function(req, res){
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
		console.log('data : ' + __dirname);
		res.end(data);
	});
})

app.post('/addUser', function(req, res){
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
		data = JSON.parse(data);
		data["user4"] = user["user4"];
		console.log(data);
		res.send(data);
	})
})

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("listening at: " + port);
})