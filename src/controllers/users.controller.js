const passport = require('passport');
const debug = require('debug')('app:usersController');
const MongoUtils = require('../db/mongoUtils');
const usersService = require('../services/users.service');

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

  static signin(req, res, next) {
    debug('signin', req.body, res.locals);
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/not-authorized',
    })(req, res, next);
  }

  static notAuthorized(req, res) {
    debug('notAuthorized');
    res.render('not-authorized');
  }

  static getOnlineUsers(req, res) {
    (async function getUsers() {
      try {
        const response = await usersService.getOnlineUsers();
        res.json(response.data);
      } catch (e) {
        res.status(400).send(e);
      }
    }());
  }
}

module.exports = UsersController;
