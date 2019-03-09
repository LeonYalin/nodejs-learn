const express = require('express');
const MongoUtils = require('../db/mongoUtils');

const authRouter = express.Router();

authRouter.route('/')
  .get((req, res) => {
    res.render('users');
  });

authRouter.route('/signup').post((req, res) => {
  (async function createUser() {
    const user = await MongoUtils.createUser(req.body);
    req.login(user, () => {
      res.redirect('/');
    });
  }());
});

authRouter.route('/signin')
  .post((req, res) => {

  });

module.exports = authRouter;
