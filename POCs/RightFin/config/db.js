var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/test'); 
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error while connecting to database'));
db.once('open', function callback() {
  console.log("Database connected successfully");
});
exports.db = db;