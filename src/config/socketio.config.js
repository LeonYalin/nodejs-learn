const debug = require('debug')('app');
const socketio = require('socket.io');

function runSocketio(server) {
  const io = socketio(server);

  io.on('connection', (socket) => {
    socket.emit('news', { hello: 'from node_learn!' });

    socket.on('clientEvent', (data) => {
      debug('socket.io clientEvent received', data);
    });
  });
}

module.exports = runSocketio;
