const Database = require("./Database");

class Category extends Database {
    constructor() {
        super();
    }

    async addNewCategory(idCategory, name) {
        let connection;
        try {
            connection = await this.connect();

            const query = "INSERT INTO `categories`(idCategory, name) VALUES (?, ?)";
            const [result] = await connection.query(query, [idCategory, name]);

            if (result.affectedRows > 0) {

                return { success: true, message: "Successful" };
            } else {
                return { success: false, message: "Failed to insert category..." };
            }

        } catch (error) {
            console.error("Cannot insert category: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async getCategory() {
        let connection;
        try {
            connection = await this.connect();

            const query = "SELECT * FROM `categories`";
            const [result] = await connection.query(query);

            if (result !== null) {
                const modifiedResult = result.map(categoryItem => ({ ...categoryItem, active: false }));
                return { success: true, result: modifiedResult };
            } else {
                return { success: false, message: "Failed to insert category..." };
            }
        } catch (error) {
            console.error("Cannot insert category: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    
}

module.exports = new Category();