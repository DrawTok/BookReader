const Database = require("./Database");

class Challenges extends Database {
    constructor() {
        super();
    }

    async getAllChallenges(idUser) {
        const connection = await this.connect();
        const querySelect = `
        SELECT C.name, C.startDate, C.endDate, C.target,
            (SELECT COUNT(idBook)
            FROM libraries
            WHERE modifiedTime BETWEEN
                (SELECT startDate FROM challenges WHERE idChallenge = C.idChallenge) AND
                (SELECT endDate FROM challenges WHERE idChallenge = C.idChallenge)
                AND status = 'COMPLETED'
            ) AS completedBooksCount
        FROM challenges C WHERE idUser = ?`;

        const [results] = await connection.query(querySelect, [idUser]);

        return {
            success: true,
            data: results,
        };
    }

    async createNewChallenge(idUser, name, description, startDate, endDate, target) {
        const connection = await this.connect();
        const queryInsert = "INSERT INTO challenges(idUser, name, description, startDate, endDate, target) VALUES (?, ?, ?, ?, ? ,?)";

        const [results] = await connection.query(queryInsert, [idUser, name, description, startDate, endDate, target]);

        const isAffectedRow = results.affectedRows > 0;

        return {
            success: isAffectedRow,
            message: isAffectedRow ? "Successful" : "Can not create challenges",
        };
    }

    async updateChallenges(idChallenge, name, description, startDate, endDate, target) {
        try {
            const connection = await this.connect();
            const queryUpdate = "UPDATE challenges SET name = ?, description = ?, startDate = ?, endDate = ?, target = ? WHERE idChallenge = ?";

            const [resultUpdate] = await connection.query(queryUpdate, [name, description, startDate, endDate, target, idChallenge]);

            const isAffectedRow = resultUpdate.affectedRows > 0;
            return {
                success: isAffectedRow,
                message: isAffectedRow ? "Successful" : "Can not update challenges",
            };
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    }

    async deleteChallenge(idUser, idChallenge) {
        const connection = await this.connect();
        const queryInsert = "DELETE FROM challenges WHERE idChallenge = ? AND idUser = ?";

        const [results] = await connection.query(queryInsert, [idChallenge, idUser]);

        const isAffectedRow = results.affectedRows > 0;

        return {
            success: isAffectedRow,
            message: isAffectedRow ? "Successful" : "Can not delete challenges",
        };
    }

    async getChallengeDetails(idUser, idChallenge) {
        try {
            const connection = await this.connect();

            const combinedQuery = `SELECT * FROM challenges WHERE idChallenge = ? AND idUser = ?`;

            const [combinedResults] = await connection.query(combinedQuery, [idChallenge, idUser]);

            return {
                success: true,
                data: combinedResults,
            };
        } catch (error) {
            // Handle database errors
            console.error("Error in getChallenge:", error);
            return { success: false, message: "Internal server error" };
        }
    }
}

module.exports = new Challenges();
