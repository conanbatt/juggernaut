require("./ext/array");

var Publish = require("./publish");
var Server  = require("./server");

module.exports.listen = function(nodePort, redisPort, redisHost, password){
  var redisPort = (redisPort || "6379");
  var redisHost = (redisHost || "127.0.0.1");
  Publish.listen(redisPort, redisHost, password);
  var server = Server.inst(redisPort, redisHost, password);
  server.listen(nodePort);
};
