window.showToast = ((title, data) => {
  window.VanillaToasts.create({
    title,
    text: data.msg,
    type: data.type === 'start' ? 'warning' : 'success',
    timeout: 3000,
  });
});

const socket = window.io();

socket.on('node_learn', (data) => {
  console.log('socket.io node_learn', data);
  socket.emit('helloFromClientSize', { msg: 'Hello from client side!' });
});

socket.on('personsCleanupJob', (data) => {
  window.showToast('Persons cleanup job', data);
});

socket.on('connect', () => {
  console.log('connected to socket');
});

window.socketEmit = (() => {
  socket.emit('personsCleanupJob', { action: 'personsCleanupJob', msg: 'personsCleanupJob button clicked' });
});
