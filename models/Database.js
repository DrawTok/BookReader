
const mysql = require("mysql2/promise");

class Database {
    constructor() {
        this.serverName = "103.200.22.212";
        this.databaseName = "tmquangt_book";
        this.databaseUser = "tmquangt_book";
        this.databasePassword = "Matkhau123";
    }

    async connect() {
        try {
            const connection = await mysql.createConnection({

                host: this.serverName,
                user: this.databaseUser,
                password: this.databasePassword,
                database: this.databaseName
            });
            return connection;
        } catch (error) {
            console.error('Connection error: ', error.message);
            throw error;
        }
    }

    async query(sql, values) {
        const connection = await this.connect();
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, results) => {
                connection.end(); // Close the connection after the query
                if (error) {
                    console.error('Query error: ', error.message);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

}

module.exports = Database;