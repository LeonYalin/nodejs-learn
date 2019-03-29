const adminRouter = require('../routes/admin.route');
const personsItems = require('../routes/personsItems');
const personsRouter = require('../routes/persons.route')(personsItems);
const indexLinks = require('../routes/indexLinks');
const indexRouter = require('../routes/index.route')(indexLinks);
const usersRouter = require('../routes/users.route');

function routesConfig(app) {
  app.use('/', indexRouter);
  app.use('/admin', adminRouter);
  app.use('/persons', personsRouter);
  app.use('/users', usersRouter);
}

module.exports = routesConfig;
