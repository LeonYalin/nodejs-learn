const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || 4000;
global.__basedir = __dirname;

require('./src/config/parsers.config')(app);
require('./src/config/passport.config').passportConfig(app);
require('./src/config/routes.config')(app);
require('./src/config/assets.config')(app);
require('./src/config/rabbitmq.config')(app);
require('./src/config/socketio.config')(server);

server.listen(port, () => {
  debug(`App listening on port ${chalk.green(port)}`);
});
