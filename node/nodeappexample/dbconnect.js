var MongoClient = require( 'mongodb' ).MongoClient;
var _db;
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect('mongodb://dev.eyedentifyapps.com:27017/eyedentify',  { useNewUrlParser: true }, function( err, client ) {
      _db = client.db("eyedentify");
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};