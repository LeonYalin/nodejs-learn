// mysql://bc6fd70dcbfc03:29d47ad4@us-cdbr-iron-east-03.cleardb.net/heroku_0fe9552decfc1dc?reconnect=true

const HEROKU = 'heroku';
const LOCAL = 'local';

const mysqlConfig = {
  heroku: {
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'bc6fd70dcbfc03',
    password: '29d47ad4',
    database: 'heroku_0fe9552decfc1dc',
    personsTableName: 'persons',
  },
  local: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_learn',
    personsTableName: 'persons',
  },
};

const mongoConfig = {
  heroku: {
    url: 'mongodb://heroku_4n3218vw:q14g1sem6gcub7m1dupjrbt560@ds121026.mlab.com:21026/heroku_4n3218vw',
    dbName: 'heroku_4n3218vw',
    personsCollName: 'persons',
    usersCollName: 'users',
  },
  local: {
    url: 'mongodb://localhost:27017/',
    dbName: 'node_learn',
    personsCollName: 'persons',
    usersCollName: 'users',
  },
};

function isHerokuEnv() {
  return process.env.NODE_ENV === HEROKU;
}

function getMySqlConfig() {
  return isHerokuEnv() ? mysqlConfig[HEROKU] : mysqlConfig[LOCAL];
}

function getMongoConfig() {
  return isHerokuEnv() ? mongoConfig[HEROKU] : mongoConfig[LOCAL];
}

module.exports = {
  mysqlConfig,
  mongoConfig,
  getMySqlConfig,
  getMongoConfig,
};
