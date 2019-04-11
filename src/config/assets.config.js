const express = require('express');
const path = require('path');

function assetsConfig(app) {
  app.use(express.static(path.join(global.__basedir, 'public')));
  app.use('/css', express.static(path.join(global.__basedir, 'node_modules', 'bootstrap', 'dist', 'css')));
  app.use('/js', express.static(path.join(global.__basedir, 'node_modules', 'bootstrap', 'dist', 'js')));
  app.use('/css', express.static(path.join(global.__basedir, 'node_modules', 'vanillatoasts')));
  app.use('/js', express.static(path.join(global.__basedir, 'node_modules', 'vanillatoasts')));
  app.use('/js', express.static(path.join(global.__basedir, 'node_modules', 'jquery', 'dist')));
  app.set('views', './src/views');
  app.set('view engine', 'ejs');
  app.set('json spaces', 2);
}

module.exports = assetsConfig;
