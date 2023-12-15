const express = require("express");
const app = express();

const account = require("./controllers/Account");
const authUser = require("./api/authUser");

app.use('/api/', authUser);
app.use('/controllers/', account);


module.exports = app;