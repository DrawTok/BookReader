const Database = require("./Database");

class Library extends Database {

    async saveBookRead(idUser, idBook, status) {
        try {
            const connection = await this.connect();
    
            const queryReadUID = "SELECT * FROM `libraries` WHERE idUser = ? AND idBook = ?";
            const [resultReadUID] = await connection.query(queryReadUID, [idUser, idBook]);
    
            if (resultReadUID.length === 0) {
                const querySaveData = "INSERT INTO `libraries`(idUser, idBook, status) VALUES (?, ?, ?)";
                const [insertResults] = await connection.query(querySaveData, [idUser, idBook, status]);
    
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
                const existingStatus = resultReadUID[0]?.status;
    
                if (existingStatus !== status) {
                    const queryUpdateData = "UPDATE `libraries` SET status = ? WHERE idUser = ? AND idBook = ?";
                    const [updateResults] = await connection.query(queryUpdateData, [status, idUser, idBook]);
    
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
    
}

module.exports = new Library();