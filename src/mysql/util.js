const mysql = require('mysql');

const { persons } = require('../fixtures/persons');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
});

function getConnection() { return connection; }

function connect(callback) { return connection.connect(callback); }

function closeConnection(callback) { return connection.end(callback); }

function query(queryStr) {
  return new Promise((resolve, reject) => {
    connection.query(queryStr, ((error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ results, fields });
    }));
  });
}

function getSqlDate(date) {
  const birthday = new Date(date);
  return `${birthday.getFullYear()}-${birthday.getMonth()}-${birthday.getDate()}`;
}

/**
 * Use this if node cannot connect to the mysql first time the app is running.
 * Run this in mysql workbench or cmd.
 */
function alterMysqlPassword() {
  const queryAlterMysqlPassword = "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root";
  return query(queryAlterMysqlPassword);
}

function createDB() {
  const queryCreateDB = 'CREATE DATABASE IF NOT EXISTS node_learn';
  return query(queryCreateDB);
}

function useDB() {
  const queryUseDB = 'USE node_learn';
  return query(queryUseDB);
}

function createTables() {
  const queryCreateTables = `
  CREATE TABLE IF NOT EXISTS persons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    birthday DATE,
    age INT DEFAULT 0,
    gender ENUM('m', 'f')
    )`;
  return query(queryCreateTables);
}

function fillTablesWithData(personsToStore) {
  let queryFillTablesWithData = 'INSERT IGNORE INTO persons (firstName, lastName, birthday, age, gender) VALUES';
  for (const person of personsToStore) {
    queryFillTablesWithData += ` ('${person.firstName}', '${person.lastName}', '${getSqlDate(person.birthday)}', ${person.age}, '${person.gender}'),`;
  }

  // remove last comma
  queryFillTablesWithData = queryFillTablesWithData.substr(0, queryFillTablesWithData.length - 1);

  return query(queryFillTablesWithData);
}

async function createDBDataMethods() {
  await createDB();
  await useDB();
  await createTables();
  await fillTablesWithData(persons);
  closeConnection();
}

function createDBData() {
  try {
    connect((err) => {
      if (err) {
        throw new Error(err);
      }
      createDBDataMethods();
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  connect,
  getConnection,
  closeConnection,
  query,
  createDB,
  createTables,
  fillTablesWithData,
  alterMysqlPassword,
  createDBData,
};
