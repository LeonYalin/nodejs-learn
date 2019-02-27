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

// mysql
const sqlUtil = require('./src/mysql/util');

sqlUtil.createDB();
// sqlUtil.createTables();

function prevCode() {
  // function prevCode(app, res) {
  // app.set('view engine', 'pug');
  // res.send('Hello from Node!');
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
}

app.use(morgan('tiny')); // logs network requests
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

// routing
app.use('/about', aboutRouter);
app.use('/home', homeRouter);

app.get('/', (req, res) => {
  prevCode(app, res);
  res.render('index', {
    title: 'Hello node!',
    links: indexLinks,
  });
});

app.post('/', (req, res) => {
  res.send('Hello from Express:POST');
});

app.listen(port, () => {
  debug(`App listening on port ${chalk.green(port)}`); // logs in debug mode
});
