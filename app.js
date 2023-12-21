const express = require("express");
const app = express();

app.use(express.json());

const apiBook = require("./api/apiBook");
const apiAccount = require("./api/apiAccount");
const apiCategory = require("./api/apiCategory");
// const apiCategoryFav = require("./api/apiCategoryFavorite");
const apiLibrary = require("./api/apiLibrary");

app.use('/api/', apiBook);
app.use('/api/', apiAccount);
app.use('/api/', apiCategory);
// app.use('/api/', apiCategoryFav);
app.use('/api/', apiLibrary);

module.exports = app;