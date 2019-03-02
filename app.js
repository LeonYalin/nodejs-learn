const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

const aboutRouter = require('./src/routes/aboutRoutes');
const homeItems = require('./src/routes/homeItems');
const homeRouter = require('./src/routes/homeRoutes')(homeItems);
const indexLinks = require('./src/routes/indexLinks');
const indexRouter = require('./src/routes/indexRoutes')(indexLinks);

// routing
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/home', homeRouter);

// mysql
const SqlUtilClass = require('./src/mysql/util');

const sqlUtil = new SqlUtilClass();

sqlUtil.execCreateDBDataQuery();

app.use(morgan('tiny')); // log network requests
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
  debug(`App listening on port ${chalk.green(port)}`); // logs in debug mode
});
