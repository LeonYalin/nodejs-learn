const debug = require('debug')('app:SocketService');
const SocketUtils = require('../utils/socket.utils');

class SocketService {
  constructor() {
    this.eventHandlers = [
      { name: 'runPersonsCleanupJob', handlerFunc: SocketService.handleRunPersonsCleanupJobEvent },
      { name: 'helloFromClientSize', handlerFunc: SocketService.handleHelloFromClientSize },
    ];
    this.socketUtils = new SocketUtils();
  }

  async init(server) {
    try {
      await this.socketUtils.run(server);
      this.subscribeToAllEvents();
      this.socketUtils.publishToClient({ hello: 'from node_learn!' });
    } catch (e) {
      throw new Error(e);
    }
  }

  subscribeToAllEvents() {
    for (const event of this.socketUtils.events) {
      this.subscribeToEvent(event);
    }
  }

  subscribeToEvent(name) {
    const handler = this.eventHandlers.find(i => i.name === name);
    if (handler) {
      this.socketUtils.subscribe(name, handler.handlerFunc);
    }
  }

  static handleRunPersonsCleanupJobEvent(data) {
    SocketService.logEvent('runPersonsCleanupJob callback', data);
  }

  static handleHelloFromClientSize(data) {
    SocketService.logEvent('helloFromClientSize callback', data);
  }

  static logEvent(name, data) {
    debug(`received event ${name} with data:`, data);
  }
}

module.exports = SocketService;
