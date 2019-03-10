const { MongoClient, ObjectID } = require('mongodb');
const { mongoPersons } = require('../fixtures/persons');

const DB_NAME = 'node_learn';
const PERSONS_COLL_NAME = 'persons';
const USERS_COLL_NAME = 'users';

class MongoUtils {
  MongoUtils() {
    this.connection = null;
  }

  static createConnection() {
    // const url = 'mongodb://ayala:q1w2e3r4!@localhost:27017/';
    const url = 'mongodb://localhost:27017/';
    return new MongoClient(url);
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
          const db = connection.db(DB_NAME);
          const personsCollExists = await db.listCollections({ name: PERSONS_COLL_NAME }).hasNext();
          if (!personsCollExists) {
            const collection = await db.createCollection(PERSONS_COLL_NAME);
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
          const db = connection.db(DB_NAME);
          const response = await db.collection(PERSONS_COLL_NAME).insertOne(person);
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
          const db = connection.db(DB_NAME);
          const response = await db.collection(PERSONS_COLL_NAME).insertMany(mongoPersons);
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
          const db = connection.db(DB_NAME);
          const criteria = {};
          if (id) {
            criteria._id = new ObjectID(id);
          }
          const person = await db.collection(PERSONS_COLL_NAME).findOne(criteria);
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
          const db = connection.db(DB_NAME);
          const criteria = {};
          if (username && password) {
            criteria.username = username;
            criteria.password = password;
          }
          const person = await db.collection(USERS_COLL_NAME).findOne(criteria);
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
          const db = connection.db(DB_NAME);
          const persons = await db.collection(PERSONS_COLL_NAME).find({}).toArray();
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
          const db = connection.db(DB_NAME);
          let response = null;
          const criteria = {};
          if (name) {
            criteria.$or = [
              { firstName: { $regex: name, $options: '-i' } },
              { lastName: { $regex: name, $options: '-i' } },
            ];
          }

          response = await db.collection(PERSONS_COLL_NAME).find(criteria).toArray();
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
          const db = connection.db(DB_NAME);
          const response = await db.collection(USERS_COLL_NAME).insertOne(user);
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
