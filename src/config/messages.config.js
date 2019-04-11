const SocketService = require('../services/socket.service');
const QueueService = require('../services/queue.service');
const SqlUtils = require('../utils/sql.utils');
const MongoUtils = require('../utils/mongo.utils');

function messagesConfig(server) {
  const queueService = new QueueService();
  const socketService = new SocketService();

  socketService.init(server, () => {
    socketService.subscribe('personsCleanupJob', ((data) => {
      queueService.publishToJobsQueue(SocketService.bufferize(data));
    }));

    socketService.subscribe('helloFromClientSize', ((data) => {
      SocketService.logEvent('helloFromClientSize', data);
    }));

    socketService.publishToClient({ hello: 'from node_learn!' });
  });

  queueService.init(() => {
    queueService.subscribeToJobsQueue(async (data) => {
      try {
        socketService.publish('personsCleanupJob', { type: 'start', msg: 'Persons cleanup job started' });
        await SqlUtils.deleteAllPersons();
        await MongoUtils.deleteAllPersons();
        socketService.publish('personsCleanupJob', { type: 'finish', msg: 'Persons cleanup job finished successfully' });
      } catch (e) {
        throw new Error(e);
      }
    });
  });
}

module.exports = messagesConfig;
