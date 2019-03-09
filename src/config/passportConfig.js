const passport = require('passport');
require('./strategies/local.strategy')();

function authenticate() {
  passport.authenticate('local', { failureRedirect: '/login' });
}

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = {
  authenticate,
  passportConfig,
};
