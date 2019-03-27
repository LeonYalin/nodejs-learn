const adminRouter = require('../routes/adminRoutes');
const personsItems = require('../routes/personsItems');
const personsRouter = require('../routes/personsRoutes')(personsItems);
const indexLinks = require('../routes/indexLinks');
const indexRouter = require('../routes/indexRoutes')(indexLinks);
const usersRouter = require('../routes/usersRoutes');

function routesConfig(app) {
  app.use('/', indexRouter);
  app.use('/admin', adminRouter);
  app.use('/persons', personsRouter);
  app.use('/users', usersRouter);
}

module.exports = routesConfig;
