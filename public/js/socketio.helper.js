window.socket = window.io.connect('http://localhost:4000');

window.socket.on('hello', (data) => {
  console.log('socket.io hello', data);
  window.socket.emit('helloFromClientSize', { my: 'Hello from client side!' });
});
