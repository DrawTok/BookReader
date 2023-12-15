const express = require("express");
const app = express();

const account = require("./controllers/Account");
app.use('/controllers/getInfo', account);

module.exports = app;