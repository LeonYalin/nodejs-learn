const express = require('express');

module.exports = ((indexLinks) => {
  const indexRouter = express.Router();

  indexRouter.route('/').get('/', (req, res) => {
    res.render('index', {
      title: 'Hello node!',
      links: indexLinks,
    });
  });

  indexRouter.route('/').post('/', (req, res) => {
    res.send('Hello from Express:POST');
  });
});
