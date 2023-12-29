const mysql = require("mysql2/promise");
require("dotenv").config();

class Database {
    constructor() {
        this.serverName = process.env.SERVER_NAME;
        this.databaseName = process.env.DATABASE_NAME;
        this.databaseUser = process.env.DATABASE_USER;
        this.databasePassword = process.env.DATABASE_PASSWORD;
    }

    async connect() {
        try {
            const connection = await mysql.createConnection({
                host: this.serverName,
                user: this.databaseUser,
                password: this.databasePassword,
                database: this.databaseName,
            });
            return connection;
        } catch (error) {
            console.error("Connection error: ", error.message);
            throw error;
        }
    }

    async query(sql, values) {
        const connection = await this.connect();
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, results) => {
                connection.end(); // Close the connection after the query
                if (error) {
                    console.error("Query error: ", error.message);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Database;
