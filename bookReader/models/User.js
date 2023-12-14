const Database = require("./Database")

class User extends Database {

    constructor() {
        super();
    }

    async createUser() {
        try {
            const connection = await this.connect();
            const query = "INSERT INTO types(type_id, type_name) VALUES (?, ?)";
            const results = await connection.query(query, [null, "test"]);
            connection.end();
            return { success: true };
        } catch (error) {
            console.error("Cannot create new user: ", error.message);
            throw error;
        }
    }
}

module.exports = User;