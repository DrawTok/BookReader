const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

const apiBook = require("./api/apiBook");
const apiAccount = require("./api/apiAccount");
const apiCategory = require("./api/apiCategory");
const apiLibrary = require("./api/apiLibrary");
const apiDictionary = require("./api/apiDictionary");
const apiChallenges = require("./api/apiChallenges");

app.use("/api/", apiBook);
app.use("/api/", apiAccount);
app.use("/api/", apiCategory);
app.use("/api/", apiLibrary);
app.use("/api/", apiDictionary);
app.use("/api/", apiChallenges);

module.exports = app;
