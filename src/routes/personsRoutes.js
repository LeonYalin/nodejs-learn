const express = require('express');
const SqlUtil = require('../db/sqlUtils');

module.exports = ((items) => {
  const personsRouter = express.Router();

  personsRouter.route('/').get((req, res) => {
    (async function getPersons() {
      const persons = await SqlUtil.getAllPersons();
      res.render('persons', { persons });
    }());
  });

  personsRouter.route('/:id')
    .all((req, res, next) => { // middleware example
      (async function getPerson() {
        const { id } = req.params;
        const person = await SqlUtil.getSinglePerson(id);
        req.person = person;
        next();
      }());
    })
    .get((req, res) => {
      res.render('person', { person: req.person });
    });

  return personsRouter;
});
