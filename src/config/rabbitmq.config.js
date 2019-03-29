const debug = require('debug')('app');
const amqp = require('amqplib/callback_api');

function runRabbitmq() {
  amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((error, ch) => {
      const q = 'hello';

      ch.assertQueue(q, { durable: false });
      debug(' [*] Waiting for messages in %s. To exit press CTRL+C', q);

      ch.consume(q, (msg) => {
        debug(' [x] Received %s', msg.content.toString());
      }, { noAck: true });
    });
  });
}

module.exports = runRabbitmq;
