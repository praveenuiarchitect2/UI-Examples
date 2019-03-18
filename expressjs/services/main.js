var express = require('express');
var app = express();
var mysql = require('mysql')
const cors = require("cors");
var dateFormat = require('dateformat');

app.use(cors());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'paul',
    database: 'test'
});


bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
connection.connect()
app.get('/getusers', function (req, res) {
    function fetchID(callback) {
      //  connection.connect()
        connection.query('SELECT * FROM test.user_tbl', function(err, rows) {
            if (err) {
                callback(err, null);
            } else 
                callback(null, rows);
        });
      //  connection.end()
    }
    fetchID(function(err, content) {
        res.send(content);  
    });
    console.log("3");
    
    //   res.send('Hello World -- 1');
})

app.post('/api/client-engagement', function(req, res) {
    var engagement_id = req.body.engagement_id;
    var engagement_name = req.body.engagement_name;
    var description = req.body.description;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    var engagement_type = req.body.engagement_type;
    var client_id = req.body.client_id;
    var sow = req.body.sow;
    var file1 = req.body.file1;
    var file2 = req.body.file2;
    var file3 = req.body.file3;
    var remarks = req.body.remarks;
    var sql = "INSERT INTO engagement_tbl ( engagement_id, engagement_name,description,startdate,enddate,engagement_type,client_id,sow,file1,file2,file3,remarks ) VALUES ?"
    var arr = [[engagement_id, engagement_name,description,startdate,enddate,engagement_type,client_id,sow,file1,file2,file3,remarks]];
    function fetchID(callback) {
          connection.query(sql, [arr], function(err, rows) {
            console.log("error"+err);
            console.log("row"+rows);
            if (err) {
                console.log(err)
                  callback(err, null);
              } else  {
                console.log(rows)
                  callback(null, rows);
              }
          });
        //  connection.end()
      }
      fetchID(function(err, content) {
       //   console.log("content"+content[0]);
          if(content) {
            res.send({success: true});  
          } else {
            res.send({success: false});
          }
          
      });
   // res.send(user_id + ' ' + token + ' ' + geo);
});

app.post('/api/client-contact', function(req, res) {
    var client_id = req.body.client_id;
    var contact_name = req.body.contact_name;
    var remarks = req.body.remarks;
    var contact_id = req.body.contact_id;
    var email = req.body.email;
    var phone1 = req.body.phone1;
    var phone2 = req.body.phone2;
    var sql = "INSERT INTO contact_tbl (client_id, contact_id, contact_name, email, phone1, phone2, remarks ) VALUES ?"
    var arr = [[client_id, contact_id, contact_name, email, phone1, phone2, remarks]];
    function fetchID(callback) {
          connection.query(sql, [arr], function(err, rows) {
            console.log("error"+err);
            console.log("row"+rows);
            if (err) {
                console.log(err)
                  callback(err, null);
              } else  {
                console.log(rows)
                  callback(null, rows);
              }
          });
        //  connection.end()
      }
      fetchID(function(err, content) {
       //   console.log("content"+content[0]);
          if(content) {
            res.send({success: true});  
          } else {
            res.send({success: false});
          }
          
      });
   // res.send(user_id + ' ' + token + ' ' + geo);
});


app.post('/api/client', function(req, res) {
    var client_id = req.body.client_id;
    var client_name = req.body.client_name;
    var remarks = req.body.remarks;
    var now = new Date();
    var date = dateFormat(now, "isoDateTime");
    function fetchID(callback) {
          connection.query('INSERT INTO client_tbl (client_id, client_name, remarks ) VALUES ('+client_id+',\''+client_name+'\',\''+remarks+'\')', function(err, rows) {
            console.log("error"+err);
            console.log("row"+rows);
            if (err) {
                console.log(err)
                  callback(err, null);
              } else  {
                console.log(rows)
                  callback(null, rows);
              }
          });
        //  connection.end()
      }
      fetchID(function(err, content) {
       //   console.log("content"+content[0]);
          if(content) {
            res.send({success: true});  
          } else {
            res.send({success: false});
          }
          
      });
   // res.send(user_id + ' ' + token + ' ' + geo);
});

app.post('/api/users', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    function fetchID(callback) {
        //  connection.connect()
          console.log(username)
          console.log(password)
          connection.query('SELECT * FROM test.user_tbl where username=\''+username+ '\' and password=\''+password+'\'', function(err, rows) {
              if (err) {
                console.log(err)
                  callback(err, null);
              } else  {
                console.log(rows)
                  callback(null, rows);
              }
          });
        //  connection.end()
      }
      fetchID(function(err, content) {
          if(content) {
            res.send({success: true});  
          } else {
            res.send({success: false});
          }
          
      });
      console.log("3");
   // res.send(user_id + ' ' + token + ' ' + geo);
});


app.get('/abc', function (req, res) {
    res.send('Iam in abasd');
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})