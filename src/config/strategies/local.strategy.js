const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoUtils = require('../../utils/mongo.utils');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    const user = { username, password };
    (async function findUser() {
      try {
        const dbUser = await MongoUtils.getSingleUser(user);
        if (dbUser) {
          done(null, dbUser); // successRedirect
        } else {
          done(null, false); // failureRedirect
        }
      } catch (e) {
        throw new Error(e);
      }
    }());
  }));
};
