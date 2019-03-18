var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'paul',
  database : 'test'
});

connection.connect()

connection.query('SELECT * FROM test.user_tbl', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].username)
})

connection.end()