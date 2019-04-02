const express = require('express');

const app = express();
const chalk = require('chalk');
const debug = require('debug')('app');
const server = require('http').Server(app);
const SocketService = require('./src/services/socket.service');
const QueueService = require('./src/services/queue.service');

const socketService = new SocketService();
socketService.init(server);

const queueService = new QueueService();
queueService.init();

const port = process.env.PORT || 4000;
global.__basedir = __dirname;

require('./src/config/parsers.config')(app);
require('./src/config/passport.config').passportConfig(app);
require('./src/config/routes.config')(app);
require('./src/config/assets.config')(app);
// require('./src/config/rabbitmq.config')(app);

server.listen(port, () => {
  debug(`App listening on port ${chalk.green(port)}`);
});
