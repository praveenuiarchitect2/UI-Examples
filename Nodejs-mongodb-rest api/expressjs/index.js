var express = require('express');
var app = express();
//var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var things = require('./things.js');
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
var MongoClient = require('mongodb').MongoClient
app.set('view engine', 'pug');
app.set('views', './views');
// var MongoClient = require('mongodb').MongoClient
// var db;
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     if (req.method === 'Options') {
//       res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
//       return res.status(200).json({});
//     }
//   });

// Connection options
const defaultOptions = {
    // Use native promises (in driver)
    promiseLibrary: global.Promise,
    // Write concern (Journal Acknowledged)
    w: 1,
    j: true
  };
  
  function connect (mongoose, dbURI, options = {}) {
    // Merge options with defaults
    const driverOptions = Object.assign(defaultOptions, options);
  
    // Use Promise from options (mongoose)
    mongoose.Promise = driverOptions.promiseLibrary;
  
    // Connect
    mongoose.connect(dbURI, driverOptions);
  
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });
  
    return mongoose.connection;
  }
  var MongoDB = connect(mongoose, 'mongodb://192.168.1.104:27017/mynewdb',  {useNewUrlParser: true});

//MongoDB.on('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//   console.log("mongodb connection open");
// });
// MongoClient.connect('mongodb://183.83.163.94:27017/mynewdb', {
//     useNewUrlParser: true
// }, function (err, client) {
//     if (err) throw err

//     db = client.db('mynewdb')

//     //   db.collection('users').find().toArray(function (err, result) {
//     //     if (err) throw err

//     //     console.log(result)
//     //   })
// })
var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
 });
var Person = mongoose.model("Person", personSchema);
app.get('/person', function(req, res){
    console.log(req.body)
   // var newPerson = new Person()
    Person.find(function (err, result) {
                if (err) throw err
        
                res.send(result);
              })
    
 });

 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    console.log(personInfo)
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
       res.send('Sorry Provided wrong infomation');
    } else {
       var newPerson = new Person({
          name: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         
       newPerson.save(function(err, Person){
          if(err)
             res.send('Error');
          else
             res.send('Success');
       });
    }
 });
app.use('/', things);
app.use(express.static('public'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
 });

 app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });

 // Matched Patterns
 app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
 });

 //Middleware function to log request protocol
app.use('/things', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});



app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

// Route handler that sends the response
app.get('/things', function(req, res){
   res.send('Things');
});
 //Other routes here
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });
app.listen(5000);
console.log("Server started! 5000 port")