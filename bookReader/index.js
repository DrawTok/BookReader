const Database = require("./models/Database");
const User = require("./models/User");
const express = require('express');
const mysql = require("mysql");

const app = express();
const db = new Database();

(async () => {
    try {
        const additionalResults = await db.query('SELECT * FROM types');
        console.log(additionalResults);
    } catch (error) {
        console.error('Error executing additional query:', error);
    }
})();

(async () => {
    try {
        const user = new User();
        user.createUser();
    } catch (error) {
        console.error('Error executing additional query:', error);
    }
})();

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});