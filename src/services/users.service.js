const debug = require('debug')('app:UsersService');
const axios = require('axios');

class UsersService {
  constructor() {
    this.url = 'https://jsonplaceholder.typicode.com/users';
  }

  getOnlineUsers() {
    debug('getOnlineUsers', this.url);
    return axios.get(this.url);
  }
}

const usersService = new UsersService();

module.exports = usersService;
