const express = require('express');
const passport = require('passport');
const MongoUtils = require('../db/mongoUtils');

const usersRouter = express.Router();

usersRouter.route('/')
  .get((req, res) => {
    res.render('users');
  });

usersRouter.route('/signup').post((req, res) => {
  (async function createUser() {
    const user = await MongoUtils.createUser(req.body);
    req.login(user, () => {
      res.redirect('/');
    });
  }());
});

usersRouter.route('/signin')
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/not-authorized',
  }));

usersRouter.route('/not-authorized')
  .get((req, res) => {
    res.render('not-authorized');
  });

module.exports = usersRouter;
