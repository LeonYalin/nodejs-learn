const { MongoClient } = require('mongodb');
const { mongoPersons } = require('../fixtures/persons');

const DB_NAME = 'node_learn';
const COLL_NAME = 'persons';

class MongoUtils {
  MongoUtils() {
    this.connection = null;
  }

  static createConnection() {
    const url = 'mongodb://ayala:q1w2e3r4!@localhost:27017/';
    // const url = 'mongodb://localhost:27017/';
    return new MongoClient(url);
  }

  static createPersonsCollection() {
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
          const personsCollectionExists = await db.listCollections({ name: COLL_NAME }).hasNext();
          if (!personsCollectionExists) {
            const collection = await db.createCollection(COLL_NAME);
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
          const response = await db.collection(COLL_NAME).insertOne(person);
          resolve(response);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }

  static loadAllPersons() {
    return new Promise((resolve, reject) => {
      (async function loadAll() {
        const connection = MongoUtils.createConnection();
        try {
          await connection.connect();
          const db = connection.db(DB_NAME);
          const response = await db.collection(COLL_NAME).insertMany(mongoPersons);
          resolve(response);
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

          response = await db.collection(COLL_NAME).find(criteria).toArray();
          resolve(response);
        } catch (e) {
          reject(e);
        }
        connection.close();
      }());
    });
  }
}


module.exports = MongoUtils;
