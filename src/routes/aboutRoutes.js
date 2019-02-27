const express = require('express');

const aboutRouter = express.Router();

aboutRouter.route('/').get((req, res) => {
  res.send('Hello from about');
});

module.exports = aboutRouter;
