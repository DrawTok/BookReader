const Database = require("./Database");

const { getBookDetailById } = require('../utils/utilsFilterMapBook');
class Library extends Database {

    async saveBookRead(idUser, idBook, status, lastPageReading) {
        try {
            const connection = await this.connect();

            const queryReadUID = "SELECT * FROM `libraries` WHERE idUser = ? AND idBook = ?";
            const [resultReadUID] = await connection.query(queryReadUID, [idUser, idBook]);

            if (resultReadUID.length === 0) {
                const querySaveData = "INSERT INTO `libraries`(idUser, idBook, status, lastPageReading) VALUES (?, ?, ?, ?)";
                const [insertResults] = await connection.query(querySaveData, [idUser, idBook, status, lastPageReading]);

                if (insertResults.affectedRows > 0) {
                    return {
                        success: true,
                        message: "Successful."
                    };
                } else {
                    return {
                        success: false,
                        message: "An error occurred. Please try again..."
                    };
                }
            } else {
                const oldPage = resultReadUID[0]?.lastPageReading;
                var currentTime = new Date();
                var newTime = new Date(currentTime.getTime() + (7) * 60 * 60 * 1000);
                var formattedTime = newTime.toISOString().slice(0, 19).replace('T', ' ');
                if (oldPage !== lastPageReading) {
                    const queryUpdatePage = "UPDATE `libraries` SET lastPageReading = ?, status = ?, modifiedTime = ? WHERE idUser = ? AND idBook = ?";
                    const [updateResults] = await connection.query(queryUpdatePage,
                        [lastPageReading, status, formattedTime, idUser, idBook]);
                    if (updateResults.affectedRows > 0) {
                        return {
                            success: true,
                            message: "Successful."
                        };
                    } else {
                        return {
                            success: false,
                            message: "An error occurred. Please try again..."
                        };
                    }
                } else {
                    return {
                        success: true,
                        message: "No changes needed."
                    };
                }
            }
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during save reading.",
            };
        }
    }

    async getBookByStatus(idUser, status) {
        try {
            const connection = await this.connect();

            const queryReadUID = "SELECT * FROM `libraries` WHERE idUser = ? AND status = ?";
            const [resultReadUID] = await connection.query(queryReadUID, [idUser, status]);

            if (resultReadUID.length > 0) {

                const idBooks = resultReadUID.map((entry) => entry.idBook);
                const results = await getBookDetailById(idBooks);

                return {
                    success: true,
                    result: results
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
                message: "An error occurred during save reading.",
            };
        }
    }

    async deleteBookmark(idUser, idBook) {
        try {
            const connection = await this.connect();
            const queryDelete = "DELETE FROM libraries WHERE idUser = ? AND idBook = ?";
            const [results] = await connection.query(queryDelete, [idUser, idBook]);
            const isAffectedRow = results.affectedRows > 0;
            return {
                success: isAffectedRow,
                message: isAffectedRow ? 'Successful' : 'No data'
            }

        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during save reading.",
            };
        }
    }
}

module.exports = new Library();