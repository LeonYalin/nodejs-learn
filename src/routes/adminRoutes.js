const express = require('express');
const debug = require('debug')('app:admin');
const chalk = require('chalk');
const MongoUtils = require('../db/mongoUtils');
const Person = require('../entities/Person');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  res.render('admin');
});

adminRouter.route('/add').post((req, res) => {
  const {
    firstName, lastName, birthday, age, gender, img,
  } = req.body;

  const person = new Person(firstName, lastName, birthday, age, gender, img);
  debug(`${chalk.green('Add new person')}`, person.toString());

  (async function addPerson() {
    try {
      await MongoUtils.addPerson(person);
      res.send('Person added successfully');
    } catch (e) {
      res.sendStatus(400).send(e);
    }
  }());
});

module.exports = adminRouter;
