const debug = require('debug')('app:SocketService');
const SocketUtils = require('../utils/socket.utils');

class SocketService {
  constructor(queueService) {
    this.eventHandlers = [
      { name: 'runPersonsCleanupJob', handlerFunc: this.handleRunPersonsCleanupJobEvent.bind(this) },
      { name: 'helloFromClientSize', handlerFunc: SocketService.handleHelloFromClientSize },
    ];
    this.socketUtils = new SocketUtils();
    this.queueService = queueService;
  }

  init(server) {
    try {
      this.socketUtils.run(server, (() => {
        this.subscribeToAllEvents();
        this.socketUtils.publishToClient({ hello: 'from node_learn!' });
      }));
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

  handleRunPersonsCleanupJobEvent(data) {
    SocketService.logEvent('runPersonsCleanupJob', data);
    this.queueService.publishToJobsQueue(SocketService.bufferize(data));
  }

  static handleHelloFromClientSize(data) {
    SocketService.logEvent('helloFromClientSize', data);
  }

  static logEvent(name, data) {
    debug(`received event ${name} with data:`, data);
  }

  static bufferize(data) {
    return Buffer.from(JSON.stringify(data));
  }
}

module.exports = SocketService;
