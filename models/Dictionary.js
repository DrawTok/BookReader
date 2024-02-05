const Database = require("../models/Database");
const axios = require("axios");
const { LINK_TRANSLATE } = require("../utils/constant");

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

    async getDictionary(idUser) {
        try {
            const connection = await this.connect();
            const selectQuery = "SELECT * FROM dictionaries WHERE idUser = ?";
            const [results] = await connection.query(selectQuery, [idUser]);
            if (results.length > 0) {
                //fetch data from api base on word
                const resultsFull = await Promise.all(
                    results.map(async (item) => {
                        const resultTranslate = await this.translateWord(item.word);
                        return {
                            idUser: item.idUser,
                            ...resultTranslate,
                        };
                    })
                );

                return {
                    success: true,
                    data: resultsFull,
                };
            }

            return {
                success: false,
                message: "No data",
            };
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred while getting the dictionary.",
            };
        }
    }

    async addNewWord(idUser, word) {
        try {
            const connection = await this.connect();
            const resultTranslate = await this.translateWord(word);
            //check exist word
            const selectQuery = "SELECT * FROM dictionaries WHERE idUser = ? AND word = ?";
            const [resultsSelect] = await connection.query(selectQuery, [idUser, word]);

            if (resultsSelect.length > 0) return success;

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
            const jsonData = response.data[0];

            return jsonData;
            /*if (!jsonData) {
                throw new Error("No data found for the provided word.");
            }

            const meanings = jsonData.meanings[0];
            if (!meanings) {
                throw new Error("No definitions found for the provided word.");
            }

            const phonetics = jsonData.phonetics[1] || {};
            const definitions = meanings.definitions || [];

            return {
                text: phonetics.text || "No phonetic text available",
                audio: phonetics.audio || "No audio available",

                partOfSpeech: meanings.partOfSpeech || "",
                meaning: definitions[0]?.definition || "No definition available",
                sentenceContext: definitions[0]?.example || "No example available",
            };*/
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

    async wordIsExists(idUser, word) {
        const connection = await this.connect();
        const selectQuery = "SELECT * FROM dictionaries WHERE idUser = ? AND word = ?";
        const [resultsSelect] = await connection.query(selectQuery, [idUser, word]);

        return {
            success: resultsSelect.length > 0
        };
    }
}

module.exports = new Dictionary();
