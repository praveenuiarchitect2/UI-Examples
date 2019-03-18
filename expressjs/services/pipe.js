var fs = require("fs");

// Create a readable stream
var readerStream = fs.createReadStream('a.jpg');

// Create a writable stream
var writerStream = fs.createWriteStream('b.jpg');

// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);

console.log("Program Ended");