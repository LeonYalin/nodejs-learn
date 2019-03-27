const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 4000;
global.__basedir = __dirname;

// parsers. Should be included before routes
require('./src/config/parsersConfig')(app);

// authentication
require('./src/config/passportConfig').passportConfig(app);

// routing
require('./src/config/routesConfig')(app);

// assets
require('./src/config/assetsConfig')(app);

app.use(morgan('tiny')); // log network requests
app.set('json spaces', 2);

app.listen(port, () => {
  debug(`App listening on port ${chalk.green(port)}`);
});
