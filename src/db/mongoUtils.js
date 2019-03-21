const { MongoClient, ObjectID } = require('mongodb');
const { mongoPersons } = require('../fixtures/persons');
const dbConfig = require('./dbConfig');

const mongoConfig = dbConfig.getMongoConfig();

class MongoUtils {
  MongoUtils() {
    this.connection = null;
  }

  static createConnection() {
    return new MongoClient(mongoConfig.url);
  }

  static createDBData() {
    return new Promise((resolve, reject) => {
      (async function createPersons() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
        } catch (e) {
          throw new Error(e);
        }

        try {
          const db = connection.db(mongoConfig.dbName);
          const personsCollExists = await db.listCollections({ name: mongoConfig.personsCollName }).hasNext();
          if (!personsCollExists) {
            const collection = await db.createCollection(mongoConfig.personsCollName);
            await collection.createIndex({
              firstName: 1, lastName: 1, birthday: 1, age: 1, gender: 1,
            }, { unique: true });
            resolve(collection);
          }
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }

  static addPerson(person) {
    return new Promise((resolve, reject) => {
      (async function addPerson() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(mongoConfig.dbName);
          const response = await db.collection(mongoConfig.personsCollName).insertOne(person);
          resolve(response);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }

  static loadPersonsData() {
    return new Promise((resolve, reject) => {
      (async function loadAll() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(mongoConfig.dbName);
          const response = await db.collection(mongoConfig.personsCollName).insertMany(mongoPersons);
          resolve(response);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }

  static getSinglePerson({ id }) {
    return new Promise((resolve, reject) => {
      (async function getPersons() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(mongoConfig.dbName);
          const criteria = {};
          if (id) {
            criteria._id = new ObjectID(id);
          }
          const person = await db.collection(mongoConfig.personsCollName).findOne(criteria);
          resolve(person);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }

  static getSingleUser({ username, password }) {
    return new Promise((resolve, reject) => {
      (async function getPersons() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(mongoConfig.dbName);
          const criteria = {};
          if (username && password) {
            criteria.username = username;
            criteria.password = password;
          }
          const person = await db.collection(mongoConfig.usersCollName).findOne(criteria);
          resolve(person);
        } catch (e) {
          reject(e);
        }

        connection.close();
      }());
    });
  }

  static getAllPersons() {
    return new Promise((resolve, reject) => {
      (async function getPersons() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(mongoConfig.dbName);
          const persons = await db.collection(mongoConfig.personsCollName).find({}).toArray();
          for (const person of persons) {
            person.id = person._id.toString();
          }
          resolve(persons);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }

  static searchPersons(name) {
    return new Promise((resolve, reject) => {
      (async function search() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(mongoConfig.dbName);
          let response = null;
          const criteria = {};
          if (name) {
            criteria.$or = [
              { firstName: { $regex: name, $options: '-i' } },
              { lastName: { $regex: name, $options: '-i' } },
            ];
          }

          response = await db.collection(mongoConfig.personsCollName).find(criteria).toArray();
          resolve(response);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }

  static createUser({ username, password }) {
    const user = { username, password };
    return new Promise((resolve, reject) => {
      (async function createUsr() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(mongoConfig.dbName);
          const response = await db.collection(mongoConfig.usersCollName).insertOne(user);
          resolve(response.ops[0]);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }
}


module.exports = MongoUtils;
