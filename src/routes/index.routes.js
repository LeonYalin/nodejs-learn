const express = require('express');
const IndexController = require('../controllers/index.controller');

module.exports = ((indexLinks) => {
  const indexRouter = express.Router();
  const ctrl = new IndexController(indexLinks);

  indexRouter.route('/')
    .get(ctrl.getPage.bind(ctrl));

  indexRouter.route('/')
    .post(IndexController.postPage);

  return indexRouter;
});
