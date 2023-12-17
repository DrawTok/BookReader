const express = require("express");
const app = express();

app.use(express.json());

const apiAccount = require("./api/apiAccount");
const apiCategory = require("./api/apiCategory");
const apiCategoryFav = require("./api/apiCategoryFavorite")

app.use('/api/', apiAccount);
app.use('/api/', apiCategory);
app.use('/api/', apiCategoryFav);


module.exports = app;