const express = require('express');
const SqlUtils = require('../db/sqlUtils');
const MongoUtils = require('../db/mongoUtils');

module.exports = ((items) => {
  const personsRouter = express.Router();

  personsRouter.route('/').get((req, res) => {
    (async function getPersons() {
      const sqlPersons = await SqlUtils.getAllPersons();
      const mongoPersons = await MongoUtils.getAllPersons();
      const persons = [...sqlPersons, ...mongoPersons];
      res.render('persons', { persons });
    }());
  });

  personsRouter.route('/:id')
    .all((req, res, next) => { // middleware example
      (async function getPerson() {
        const { id } = req.params;
        const person = await SqlUtils.getSinglePerson(id);
        req.person = person;
        next();
      }());
    })
    .get((req, res) => {
      res.render('person', { person: req.person });
    });

  return personsRouter;
});
