const debug = require('debug')('app:SocketUtils');
const socketio = require('socket.io');

class SocketUtils {
  constructor() {
    this.socket = null;
    this.clientName = 'node_learn';
    this.events = ['personsCleanupJob', 'helloFromClientSize'];
  }

  run(server, callback = undefined) {
    if (this.socket) return;

    const io = socketio(server);

    io.on('connection', (socket) => {
      this.socket = socket;
      debug('Successfully created connection');

      socket.on('disconnect', () => {
        debug('Successfully disconnected');
      });

      if (typeof callback === 'function') {
        callback();
      }
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

  publishToClient(data) {
    this.publish(this.clientName, data);
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
}

module.exports = SocketUtils;
