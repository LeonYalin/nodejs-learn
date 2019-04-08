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

  static async addPerson(req, res) {
    const {
      firstName, lastName, birthday, age, gender, img,
    } = req.body;

    const person = new Person(firstName, lastName, birthday, age, gender, img);
    debug(`${chalk.green('Add new person')}`, person.toString());

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
  }

  static async createMySqlDB(req, res) {
    debug('createMySqlDB');
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
  }

  static async createMongoDB(req, res) {
    debug('createMongoDB');
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
  }

  static async loadToMySql(req, res) {
    debug('loadToMySql');
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
  }

  static async loadToMongo(req, res) {
    debug('loadToMongo');
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
  }

  static async search(req, res, next) {
    const { name } = req.body;
    debug('search', req.body);

    try {
      const sqlPersons = await SqlUtils.getAllPersons();
      const mongoPersons = await MongoUtils.searchPersons(name);
      const persons = [...sqlPersons, ...mongoPersons];
      res.json(persons);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AdminController;
