const socket = window.io();

socket.on('node_learn', (data) => {
  console.log('socket.io node_learn', data);
  socket.emit('helloFromClientSize', { msg: 'Hello from client side!' });
});

socket.on('connect', () => {
  console.log('connected to socket');
});

window.socketEmit = (() => {
  socket.emit('runPersonsCleanupJob', { msg: 'runPersonsCleanupJob button clicked' });
});
