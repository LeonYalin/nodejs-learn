const mysql = require('mysql');

const { persons } = require('../fixtures/persons');

class SqlUtils {
  SqlUtils() {
    this.connection = null;
  }

  createConnection() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
    });
  }

  connect(callback) {
    this.connection.connect(callback);
  }

  closeConnection(callback) {
    this.connection.end(callback);
  }

  query(queryStr) {
    return new Promise((resolve, reject) => {
      this.connection.query(queryStr, ((error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({ results, fields });
      }));
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
  alterMysqlPassword() {
    const query = "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'";
    return this.query(query);
  }

  createDB() {
    const query = 'CREATE DATABASE IF NOT EXISTS node_learn';
    return this.query(query);
  }

  useDB() {
    const query = 'USE node_learn';
    return this.query(query);
  }

  createTables() {
    const query = `
    CREATE TABLE IF NOT EXISTS persons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(20) NOT NULL,
      lastName VARCHAR(20) NOT NULL,
      birthday DATE,
      age INT DEFAULT 0,
      gender ENUM('m', 'f')
      )`;
    return this.query(query);
  }

  fillTablesWithData(personsToStore) {
    let query = 'INSERT IGNORE INTO persons (firstName, lastName, birthday, age, gender) VALUES';
    for (const person of personsToStore) {
      query += ` ('${person.firstName}', '${person.lastName}', '${this.getSqlDate(person.birthday)}', ${person.age}, '${person.gender}'),`;
    }

    // remove last comma
    query = query.substr(0, query.length - 1);

    return this.query(query);
  }

  async createDBDataMethods() {
    await this.createDB();
    await this.useDB();
    await this.createTables();
    await this.fillTablesWithData(persons);
    this.closeConnection();
  }

  createDBData() {
    try {
      this.createConnection();
      this.connect((err) => {
        if (err) {
          throw new Error(err);
        }
        this.createDBDataMethods();
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = SqlUtils;
