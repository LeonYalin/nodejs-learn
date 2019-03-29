const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

function parsersConfig(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({ secret: 'node_learn', resave: true, saveUninitialized: true }));
}

module.exports = parsersConfig;
