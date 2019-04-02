var socket = window.io();

socket.on('node_learn', (data) => {
  console.log('socket.io node_learn', data);
  socket.emit('helloFromClientSize', { msg: 'Hello from client side!' });
  // socket.emit('runPersonsCleanupJob', { msg: 'runPersonsCleanupJob test!' });
});

socket.on('connect', () => {
  console.log('connected to socket');
});

socket.on('disconnect', (reason) => {
  console.log('disconnected from socket', reason);
});

socket.on('connect_error', (error) => {
  console.log('socket connect_error', error);
});

socket.on('connect_timeout', (timeout) => {
  console.log('socket connect_timeout', timeout);
});

socket.on('error', (error) => {
  console.log('socket error', error);
});

socket.on('reconnect', (attemptNumber) => {
  console.log('socket reconnect', attemptNumber);
});

window.socketEmit = function socketEmit() {
  socket.emit('runPersonsCleanupJob', { msg: 'runPersonsCleanupJob socketEmit!' });
};
