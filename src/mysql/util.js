const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
});


function getConnection() { return connection; }

function connect() { connection.connect(); }

function closeConnection() { connection.end(); }

function query(queryStr) {
  // connect();
  const { error, results, fields } = connection.query(queryStr);
  closeConnection();
  return { error, results, fields };
}

async function createDB() {
  const query1 = 'CREATE DATABASE IF NOT EXIST persons; USE persons';
  const { error, results, fields } = await query(query1);
  console.log(error, results, fields);
}

async function createTables() {
  const query2 = 'CREATE TABLE IF NOT EXISTS persons ()';
  const { error, results, fields } = await query(query2);
  console.log(error, results, fields);
}

module.exports = {
  connect,
  getConnection,
  closeConnection,
  query,
  createDB,
  createTables,
};
