const express = require('express');
const UsersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.route('/')
  .get(UsersController.getPage);

usersRouter.route('/signup')
  .post(UsersController.signup);

usersRouter.route('/signin')
  .post(UsersController.signin);

usersRouter.route('/not-authorized')
  .get(UsersController.notAuthorized);

module.exports = usersRouter;
