const express = require("express");
const app = express();

app.use(express.json());

const apiBook = require("./api/apiBook");
const apiAccount = require("./api/apiAccount");
const apiCategory = require("./api/apiCategory");
const apiLibrary = require("./api/apiLibrary");
const apiDictionary = require("./api/apiDictionary");

app.use('/api/', apiBook);
app.use('/api/', apiAccount);
app.use('/api/', apiCategory);
app.use('/api/', apiLibrary);
app.use('/api/', apiDictionary);

module.exports = app;