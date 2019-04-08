const passport = require('passport');
const debug = require('debug')('app:usersController');
const MongoUtils = require('../utils/mongo.utils');
const usersService = require('../services/users.service');
const passportConfig = require('../config/passport.config');

class UsersController {
  static getPage(req, res) {
    debug('getUsers');
    res.render('users');
  }

  static async signup(req, res) {
    debug('signup', req.user);
    const user = await MongoUtils.createUser(req.body);
    req.login(user, () => {
      res.redirect(passportConfig.getRedirectUrl() || '/');
    });
  }

  static signin(req, res, next) {
    debug('signin', req.body, res.locals);
    passport.authenticate('local', {
      successRedirect: passportConfig.getRedirectUrl() || '/',
      failureRedirect: '/users/not-authorized',
    })(req, res, next);
  }

  static notAuthorized(req, res) {
    debug('notAuthorized');
    res.render('not-authorized');
  }

  static async getOnlineUsers(req, res) {
    try {
      const response = await usersService.getOnlineUsers();
      res.json(response.data);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}

module.exports = UsersController;
