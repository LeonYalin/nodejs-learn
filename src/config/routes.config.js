const adminRouter = require('../routes/admin.routes');
const personsItems = require('../routes/personsItems');
const personsRouter = require('../routes/persons.routes')(personsItems);
const indexLinks = require('../routes/indexLinks');
const indexRouter = require('../routes/index.routes')(indexLinks);
const usersRouter = require('../routes/users.routes');
const globalErrorHandler = require('../routes/globalError.routes');

function routesConfig(app) {
  app.use('/', indexRouter);
  app.use('/admin', adminRouter);
  app.use('/persons', personsRouter);
  app.use('/users', usersRouter);
  app.use(globalErrorHandler);
}

module.exports = routesConfig;
