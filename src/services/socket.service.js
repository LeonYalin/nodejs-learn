const debug = require('debug')('app:SocketService');
const SocketUtils = require('../utils/socket.utils');

class SocketService {
  constructor(queueService) {
    this.socketUtils = new SocketUtils();
  }

  init(server, callback) {
    try {
      this.socketUtils.run(server, (() => {
        if (typeof callback === 'function') {
          callback();
        }
      }));
    } catch (e) {
      throw new Error(e);
    }
  }

  publish(name, data) {
    this.socketUtils.publish(name, data);
  }

  subscribe(name, callback) {
    this.socketUtils.subscribe(name, callback);
  }

  publishToClient(data) {
    this.socketUtils.publishToClient(data);
  }

  static logEvent(name, data) {
    debug(`received event ${name} with data:`, data);
  }

  static bufferize(data) {
    return Buffer.from(JSON.stringify(data));
  }
}

module.exports = SocketService;
