const socket = window.io.connect('http://localhost:4000');

socket.on('news', (data) => {
  console.log('socket.io news', data);
  socket.emit('clientEvent', { my: 'hello from client side!' });
});
