const express = require('express');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  res.send('Hello from admin');
});

module.exports = adminRouter;
