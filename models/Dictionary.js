const Database = require("../models/Database");

const success = {
    success: true,
    message: "Successful.",
};

const fail = {
    success: false,
    message: "An error occurred.",
};

class Dictionary extends Database {
    constructor() {
        super();
    }

    async addNewWord(word, meaning) {
        try {
            const connection = await this.connect();
            const query = "INSERT INTO dictionaries(word, meaning) VALUES (?, ?)";
            const [results] = connection.query(query, [word, meaning]);

            return results.affectedRows > 0 ? success : fail;
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during save word.",
            };
        }
    }

}

module.exports = new Dictionary();