const express = require('express');
const { authenticate } = require('../config/passportConfig');
const PersonsCotroller = require('../controllers/personsController');

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
