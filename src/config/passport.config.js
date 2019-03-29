const passport = require('passport');
require('./strategies/local.strategy')();

function authenticate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/users/not-authorized');
  }
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
