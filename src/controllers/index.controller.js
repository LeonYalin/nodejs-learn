const debug = require('debug')('app:indexController');

class IndexController {
  constructor(links = []) {
    this.links = links;
  }

  getPage(req, res) {
    debug('getIndex', this.links);
    res.render('index', {
      title: 'Hello Node!',
      links: this.links,
    });
  }

  static postPage(req, res) {
    debug('postIndex');
    res.send('Hello from Express:POST');
  }
}

module.exports = IndexController;
