var server = require('pushstate-server');

server.start({
  port: 9000,
  directory: './build'
});
console.log("Running...9000")
