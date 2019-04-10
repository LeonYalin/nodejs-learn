const SocketService = require('../services/socket.service');
const QueueService = require('../services/queue.service');

function messagesConfig(server) {
  const queueService = new QueueService();
  queueService.init();

  const socketService = new SocketService(queueService);
  socketService.init(server);
}

module.exports = messagesConfig;
