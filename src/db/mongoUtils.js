const { MongoClient } = require('mongodb');

class MongoUtils {
  MongoUtils() {
    this.connection = null;
  }

  static createConnection() {
    const url = 'mongodb://localhost:27017/node_learn';
    return new MongoClient(url);
  }

  static createPersonsCollection() {
    return new Promise((resolve, reject) => {
      (async function insertPerson() {
        const connection = MongoUtils.createConnection();
        await connection.connect();

        const db = connection.db('node_learn');

        const personsCollectionExists = db.listCollections({ name: 'persons' }).hasNext();
        if (!personsCollectionExists) {
          try {
            const collection = await db.createCollection('persons');
            resolve(collection);
          } catch (e) {
            reject(e);
          }
        }
      }());
    });
  }
}

module.exports = MongoUtils;
