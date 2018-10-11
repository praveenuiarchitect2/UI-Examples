var express = require('express');
var app = express();

app.use(express.static('public'))

app.get('/', function (req, res) {
	console.log("req :" + req.toString());
   res.send('Hello World');
})

app.get('/page1', function(req, res){

	res.send('Its page1');
})

app.post('/page1', function(req, res){
	res.send('Its Post call of Page1' + req.param('policy'));
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
