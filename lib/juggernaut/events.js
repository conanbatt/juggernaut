var redis   = require("./redis");

Events = module.exports = {};
Events.client = null;

Events.initEvents = function(redisPort, redisHost, password) {
  this.initClient(redisPort, redisHost);
};

Events.initClient = function(redisPort, redisHost, password) {
  if (this.client) return;
  this.client = redis.createClient(redisPort, redisHost);
  this.client.auth(password)
};

Events.publish = function(key, value){
  this.client.publish(
    "juggernaut:" + key, 
    JSON.stringify(value)
  );
};

Events.subscribe = function(channel, client) {
  this.publish(
    "subscribe", 
    {
      channel:    channel.name,
      meta:       client.meta,
      session_id: client.session_id
    }
  );
};

Events.unsubscribe = function(channel, client) {
  this.publish(
    "unsubscribe",
    {
      channel:    channel.name,
      meta:       client.meta,
      session_id: client.session_id
    }
  );  
};

Events.custom = function(client, data) {
  this.publish(
    "custom", 
    {
      meta:       client.meta,
      session_id: client.session_id,
      data:       data
    }
  );
};
