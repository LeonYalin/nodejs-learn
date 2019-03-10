const passport = require('passport');
const debug = require('debug')('app:usersController');
const MongoUtils = require('../db/mongoUtils');

class UsersController {
  static getPage(req, res) {
    debug('getUsers');
    res.render('users');
  }

  static signup(req, res) {
    debug('signup', req.user);
    (async function createUser() {
      const user = await MongoUtils.createUser(req.body);
      req.login(user, () => {
        res.redirect('/');
      });
    }());
  }

  static signin(req, res) {
    debug('signin', req.body, res.locals);
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/not-authorized',
    });
  }

  static notAuthorized(req, res) {
    debug('notAuthorized');
    res.render('not-authorized');
  }
}

module.exports = UsersController;
