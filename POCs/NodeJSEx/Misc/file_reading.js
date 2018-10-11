var fs = require("fs");

var data = fs.readFile('input.txt', function (err, data) {
	// body...
	console.log(data.toString()); 
});


console.log("Program Ended"); 

