const express = require('express');
const { authenticate } = require('../config/passport.config');
const PersonsCotroller = require('../controllers/persons.controller');

module.exports = (() => {
  const personsRouter = express.Router();

  personsRouter.use(authenticate);

  personsRouter.route('/')
    .get(PersonsCotroller.getPage);

  personsRouter.route('/:id')
    .all(PersonsCotroller.getPersonByIdMiddleware)
    .get(PersonsCotroller.getPersonsById);

  return personsRouter;
});
