const express = require("express");
const app = express();

const account = require("./controllers/Account");
const authUser = require("./api/authUser");
const apiCategory = require("./api/apiCategory");
const apiCategoryFav = require("./api/apiCategoryFavorite")

app.use('/api/', authUser);
app.use('/controllers/', account);
app.use('/api/', apiCategory);
app.use('/api/', apiCategoryFav);


module.exports = app;