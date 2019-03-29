const debug = require('debug')('app:SocketUtils');
const socketio = require('socket.io');
const SocketEventsUtils = require('./socket-events.utils');

class SocketUtils {
  constructor() {
    this.socket = null;
    this.socketEventsUtils = new SocketEventsUtils();
  }

  run(server) {
    if (this.socket) return;

    const io = socketio(server);

    io.on('connection', (socket) => {
      this.socket = socket;
      debug('Successfully created connection');

      this.subscribeToAllEvents();
      this.publish('hello', { hello: 'from node_learn!' });
    });
  }

  publish(name, data) {
    if (!this.socket) return;
    this.socket.emit(name, data);
    debug(`published event '${name}' with data:`, data);
  }

  subscribe(name, callback) {
    if (!this.socket) return;
    this.socket.on(name, callback);
    debug(`subsribed to event '${name}'`);
  }

  unsubscribe(name, callback) {
    if (!this.socket) return;
    this.socket.off(name, callback);
  }

  close() {
    if (!this.socket) return;
    this.socket.close();
    this.socket = null;
  }

  subscribeToAllEvents() {
    for (const { name, callback } of this.socketEventsUtils.events) {
      this.subscribe(name, callback);
    }
  }
}

module.exports = SocketUtils;
