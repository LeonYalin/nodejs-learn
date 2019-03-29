const debug = require('debug')('app:adminController');
const chalk = require('chalk');
const SqlUtils = require('../utils/sql.utils');
const MongoUtils = require('../utils/mongo.utils');
const Person = require('../entities/Person');

class AdminController {
  static getPage(req, res) {
    debug('getPage');
    res.render('admin');
  }

  static addPerson(req, res) {
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
  }

  static createMySqlDB(req, res) {
    debug('createMySqlDB');
    (async function loadAll() {
      try {
        await SqlUtils.createDBData();
        res.send('Created MySql DB data successfully');
      } catch (e) {
        let msg = e;
        if (e.code === 11000) {
          msg = 'Database already exists';
        }
        res.status(400).send(msg);
      }
    }());
  }

  static createMongoDB(req, res) {
    debug('createMongoDB');
    (async function loadAll() {
      try {
        await MongoUtils.createDBData();
        res.send('Created MongoDB data successfully');
      } catch (e) {
        let msg = e;
        if (e.code === 11000) {
          msg = 'Database already exists';
        }
        res.status(400).send(msg);
      }
    }());
  }

  static loadToMySql(req, res) {
    debug('loadToMySql');
    (async function loadAll() {
      try {
        await SqlUtils.loadPersonsData();
        res.send('Persons loaded successfully to MySql');
      } catch (e) {
        let msg = e;
        if (e.code === 11000) {
          msg = 'Persons were already loaded';
        }
        res.status(400).send(msg);
      }
    }());
  }

  static loadToMongo(req, res) {
    debug('loadToMongo');
    (async function loadAll() {
      try {
        await MongoUtils.loadPersonsData();
        res.send('Persons loaded successfully to MongoDB');
      } catch (e) {
        let msg = e;
        if (e.code === 11000) {
          msg = 'Persons were already loaded';
        }
        res.status(400).send(msg);
      }
    }());
  }

  static search(req, res) {
    debug('search', req.body);
    const { name } = req.body;
    (async function search() {
      try {
        const sqlPersons = await SqlUtils.getAllPersons();
        const mongoPersons = await MongoUtils.searchPersons(name);
        const persons = [...sqlPersons, ...mongoPersons];
        res.json(persons);
      } catch (e) {
        res.status(400).send(e);
      }
    }());
  }
}

module.exports = AdminController;
