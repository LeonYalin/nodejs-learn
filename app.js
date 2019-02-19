const express = require("express");
const chalk = require('chalk');
const debug = require('debug')

const app = express();

app.get('/', (req, res) => {
    res.send("Hello from Express");
});

app.listen(4000, () => {
    console.log(`App listening on port ${chalk.green('4000')}`);
});