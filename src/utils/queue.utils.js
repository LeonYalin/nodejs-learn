const debug = require('debug')('app:QueueUtils');
const amqp = require('amqplib/callback_api');

class QueueUtils {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.queueName = 'jobs';
    this.events = ['finishPersonsCleanupJob'];
  }

  run() {
    return new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost', (err, conn) => {
        if (err) {
          debug('Connection error occured', err);
          reject(err);
          return;
        }
        this.connection = conn;

        conn.createChannel((error, ch) => {
          if (error) {
            debug('Create channel error occured', error);
            reject(error);
            return;
          }
          this.channel = ch;
          this.createQueue().then((data) => {
            resolve(data);
          }).catch((e) => { reject(e); });
        });
      });
    });
  }

  createQueue(name = undefined) {
    return new Promise((resolve, reject) => {
      if (!this.channel) {
        reject(new Error('channel does not exist'));
        return;
      }

      const queueName = name || this.queueName;
      this.channel.assertQueue(queueName, { durable: false }, ((err, ok) => {
        if (err) {
          reject(err);
          return;
        }

        debug(' [*] Waiting for messages in %s. To exit press CTRL+C', queueName);
        resolve(ok);
      }));
    });
  }

  subscribe(queue, callback) {
    if (!this.channel) return;
    this.channel.consume(queue, callback, { noAck: true });
    debug(`subsribed to queue '${queue}'`);
  }

  publish(queue, data) {
    if (!this.channel) return;
    this.channel.sendToQueue(queue, data, { persistent: false });
    debug(`published to queue '${queue}' with data:`, data);
  }

  subscribeToJobsQueue(callback) {
    this.subscribe(this.queueName, callback);
  }

  publishToJobsQueue(data) {
    this.publish(this.queueName, data);
  }

  close() {
    if (!this.connection) return;
    this.connection.close();
    this.connection = null;
    this.channel = null;
  }
}

module.exports = QueueUtils;
