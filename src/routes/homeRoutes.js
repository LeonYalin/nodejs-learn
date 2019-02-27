const express = require('express');

module.exports = ((items) => {
  const homeRouter = express.Router();

  homeRouter.route('/').get((req, res) => {
    res.render('home', { items });
  });

  homeRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('item', { item: items[id - 1] });
  });

  return homeRouter;
});
