const mysql = require('promise-mysql');

const { sqlPersons } = require('../fixtures/persons');

class SqlUtils {
  SqlUtils() {
    this.connection = null;
  }

  static createConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'node_learn',
    });
  }

  static getSqlDate(date) {
    const birthday = new Date(date);
    return `${birthday.getFullYear()}-${birthday.getMonth()}-${birthday.getDate()}`;
  }

  /**
   * Use this if node cannot connect to the mysql first time the app is running.
   * Run this in mysql workbench or cmd.
   */
  static alterMysqlPassword(connection) {
    const query = "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'";
    return connection.query(query);
  }

  static createDBQuery(connection) {
    const query = 'CREATE DATABASE IF NOT EXISTS node_learn';
    return connection.query(query);
  }

  static useDBQuery(connection) {
    const query = 'USE node_learn';
    return connection.query(query);
  }

  static createPersonsTableQuery(connection) {
    const query = `
    CREATE TABLE IF NOT EXISTS persons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(20) NOT NULL,
      lastName VARCHAR(20) NOT NULL,
      birthday DATE,
      age INT DEFAULT 0,
      gender ENUM('m', 'f'),
      img VARCHAR(255),
      UNIQUE KEY(firstName, lastName, birthday, age, gender) 
      )`;
    return connection.query(query);
  }

  static fillPersonsTableWithDataQuery(connection, personsToStore) {
    let query = 'INSERT IGNORE INTO persons (firstName, lastName, birthday, age, gender, img) VALUES';
    for (const person of personsToStore) {
      query += ` ('${person.firstName}', '${person.lastName}', '${SqlUtils.getSqlDate(person.birthday)}', ${person.age}, '${person.gender}', '${person.img}'),`;
    }

    // remove last comma
    query = query.substr(0, query.length - 1);

    return connection.query(query);
  }

  static getAllPersonsQuery(connection) {
    const query = 'SELECT * FROM persons';
    return connection.query(query);
  }

  static getSinglePersonQuery(connection, id) {
    const query = `SELECT * FROM persons WHERE id = ${id}`;
    return connection.query(query);
  }

  static createDBData() {
    return new Promise((resolve, reject) => {
      (async function createData() {
        try {
          const connection = await SqlUtils.createConnection();
          await SqlUtils.createDBQuery(connection);
          await SqlUtils.useDBQuery(connection);
          await SqlUtils.createPersonsTableQuery(connection);
          await SqlUtils.fillPersonsTableWithDataQuery(connection, sqlPersons);
          await connection.end();
          resolve();
        } catch (e) {
          reject(e);
        }
      }());
    });
  }

  static getAllPersons() {
    return new Promise((resolve, reject) => {
      (async function getPersons() {
        try {
          const connection = await SqlUtils.createConnection();
          const allPersons = await SqlUtils.getAllPersonsQuery(connection);
          await connection.end();
          resolve(allPersons);
        } catch (e) {
          reject(e);
        }
      }());
    });
  }

  static getSinglePerson(id) {
    return new Promise((resolve, reject) => {
      (async function getPersons() {
        try {
          const connection = await SqlUtils.createConnection();
          const person = await SqlUtils.getSinglePersonQuery(connection, parseInt(id, 10));
          await connection.end();
          resolve(person[0]);
        } catch (e) {
          reject(e);
        }
      }());
    });
  }
}

module.exports = SqlUtils;
