const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

// POST body parser. Must be put before routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
const adminRouter = require('./src/routes/adminRoutes');
const personsItems = require('./src/routes/personsItems');
const personsRouter = require('./src/routes/personsRoutes')(personsItems);
const indexLinks = require('./src/routes/indexLinks');
const indexRouter = require('./src/routes/indexRoutes')(indexLinks);

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/persons', personsRouter);

app.use(morgan('tiny')); // log network requests
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.set('json spaces', 2);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
  debug(`App listening on port ${chalk.green(port)}`); // logs in debug mode
});
