const express = require('express');
const SqlUtilClass = require('../mysql/util');

const sqlUtil = new SqlUtilClass();

module.exports = ((items) => {
  const homeRouter = express.Router();

  homeRouter.route('/').get((req, res) => {
    sqlUtil.execGetAllPersonsQuery().then((data) => {
      res.render('home', { persons: data.results });
    });
  });

  homeRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    sqlUtil.execGetPersonQuery(id).then((data) => {
      res.render('item', { person: data.results[0] || {} });
    });
  });

  return homeRouter;
});
