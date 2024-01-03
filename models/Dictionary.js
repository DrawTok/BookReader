const Database = require("../models/Database");
const axios = require('axios');
const linkTranslate = "https://api.dictionaryapi.dev/api/v2/entries/en/";

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
            //const [resultTranslate] = await this.translateWord(word);
            const insertQuery = "INSERT INTO dictionaries(idUser, word, meaning, sentenceContext) VALUES (?, ?, ?, ?)";
            const [results] = await connection.query(insertQuery, [idUser, word, resultTranslate.meaning, resultTranslate.sentenceContext]);

            return results.affectedRows > 0 ? success : fail;
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during save word.",
            };
        }
    }

    async translateWord(word) {
        try {
            const response = await axios.get(linkTranslate, { params: { word: word } });
            const jsonData = response.data;

            console.log(jsonData.definition, jsonData.example);


            return {
                meaning: jsonData.definition,
                sentenceContext: jsonData.example,
            }

        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during translate word.",
            };
        }
    }

}

module.exports = new Dictionary();