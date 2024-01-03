const Database = require("../models/Database");
const axios = require('axios');
const LINK_TRANSLATE = require("../utils/constant");

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

    async addNewWord(idUser, word) {
        try {
            const connection = await this.connect();
            const resultTranslate = await this.translateWord(word);
            const insertQuery = "INSERT INTO dictionaries(idUser, word, meaning, sentenceContext) VALUES (?, ?, ?, ?)";
            const [results] = await connection.query(insertQuery, [idUser, word, resultTranslate.meaning, resultTranslate.sentenceContext]);

            return results.affectedRows > 0 ? success : fail;
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred while saving the word.",
            };
        }
    }

    async translateWord(word) {
        try {
            const response = await axios.get(`${LINK_TRANSLATE}${word}`);
            const jsonData = response.data[0]; // Assuming the response is an array and you want the first result

            if (!jsonData) {
                throw new Error("No data found for the provided word.");
            }

            return {
                meaning: jsonData.meanings[0]?.definitions[0]?.definition || "No definition available",
                sentenceContext: jsonData.meanings[0]?.definitions[0]?.example || "No example available",
            };
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during word translation.",
            };
        }
    }

    async getDictionary(idUser) {
        try {
            const connection = await this.connect();
            const queryDic = "SELECT * FROM dictionaries WHERE idUser = ?";
            const [resultQuery] = await connection.query(queryDic, [idUser]);

            if (resultQuery.length > 0) {
                return {
                    success: true,
                    result: resultQuery
                }
            } else {
                return {
                    success: false,
                    message: "No data"
                };
            }

        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during word translation.",
            };
        }
    }

    async deleteWord(idUser, word) {
        try {
            const connection = await this.connect();
            const deleteQuery = "DELETE FROM dictionaries WHERE idUser = ? AND word = ?";
            const [resultQuery] = await connection.query(deleteQuery, [idUser, word]);

            return resultQuery.affectedRows > 0 ? success : fail;

        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during word translation.",
            };
        }
    }
}

module.exports = new Dictionary();
