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
      let msg = e;
      if (e.code === 11000) { // duplicate rows
        msg = 'Person already exists';
      }
      res.status(400).send(msg);
    }
  }());
});

adminRouter.route('/loadAll').post((req, res) => {
  (async function loadAll() {
    try {
      await MongoUtils.loadAllPersons();
      res.send('Persons loaded successfully');
    } catch (e) {
      let msg = e;
      if (e.code === 11000) { // duplicate rows
        msg = 'Persons were already loaded';
      }
      res.status(400).send(msg);
    }
  }());
});

adminRouter.route('/search').post((req, res) => {
  const { name } = req.body;
  (async function search() {
    try {
      const persons = await MongoUtils.searchPersons(name);
      res.json(persons);
    } catch (e) {
      res.status(400).send(e);
    }
  }());
});

module.exports = adminRouter;
