const express = require('express');
const SqlUtil = require('../mysql/util');

module.exports = ((items) => {
  const homeRouter = express.Router();

  homeRouter.route('/').get((req, res) => {
    (async function getPersons() {
      const persons = await SqlUtil.getAllPersons();
      res.render('home', { persons });
    }());
  });

  homeRouter.route('/:id')
    .all((req, res, next) => { // middleware example
      (async function getPerson() {
        const { id } = req.params;
        const person = await SqlUtil.getSinglePerson(id);
        req.person = person;
        next();
      }());
    })
    .get((req, res) => {
      res.render('item', { person: req.person });
    });

  return homeRouter;
});
