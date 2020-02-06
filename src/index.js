const mqtt = require('mqtt');
const config = require('../config.json');
const client = mqtt.connect(`mqtt://${config.ip}`);
const readline = require('readline');

client.on('connect', () => {
  client.subscribe('presence', (err) => {
    if (!err) {
      client.publish('presence', 'Hello mqtt');
    }
  });
});

// const state = false;
client.on('message', (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  process.stdout.write('[MQTT] sending command: > ');
  /* setInterval( () => {
    if (state == true) {
      state = false;
      client.publish('doorButton', '1');
      console.log('send 1');
    } else {
      state = true;
      client.publish('led', '1');
      console.log('send 0');
    }
  }, 1000); */
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    // client.publish('doorButton', input);
    client.publish('ledWC', input);
    process.stdout.write('[MQTT] sending command: > ');
  });
});


