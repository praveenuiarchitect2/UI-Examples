var net = require("net")

var server = net.createServer(function(connection) {
	console.log('client created');
	
	connection.on('end', function(){
		console.log("client disconnected");
	});

	connection.write('Hello...');
	connection.pipe(connection);

});

server.listen(8080, function() {
	console.log('server is listening');
})