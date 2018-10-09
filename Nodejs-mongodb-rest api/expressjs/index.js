var express = require('express');
var app = express();
//var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var things = require('./things.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mynewdb',  {useNewUrlParser: true});
var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
 });
var Person = mongoose.model("Person", personSchema);
app.get('/person', function(req, res){
    res.send('person');
 });

 app.post('/person', function(req, res){
    var personInfo = req.body; //Get the parsed information
    
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
       res.render('show_message', {
          message: "Sorry, you provided worng info", type: "error"});
    } else {
       var newPerson = new Person({
          name: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         
       newPerson.save(function(err, Person){
          if(err)
             res.render('show_message', {message: "Database error", type: "error"});
          else
             res.render('show_message', {
                message: "New person added", type: "success", person: personInfo});
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

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

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
console.log("Server started!")