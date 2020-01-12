const mqtt = require('mqtt');
const config = require('../config.json');
const client = mqtt.connect(`mqtt://${config.ip}`);

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

let state = false;
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  setInterval(function () {
    if (state) {
      state = false;
      client.publish('led', 'true');
    } else {
      state = true;
      client.publish('led', 'false');
    }
    console.log('send');
  }, 1000);
})

