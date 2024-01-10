const Database = require('./Database');

class Challenges extends Database {

    constructor() {
        super();
    }

    async createNewChallenge(idUser, name, description, startDate, endDate) {

        const connection = await this.connect();
        const queryInsert =
            "INSERT INTO challenges(idUser, name, description, startDate, endDate) VALUES (?, ?, ?, ? ,?)";

        const [results] = await connection.query(queryInsert, [idUser, name, description, startDate, endDate]);

        const isAffectedRow = results.affectedRows > 0;

        return {
            'success': isAffectedRow,
            'message': isAffectedRow ? 'Successful' : 'Do not create challenges'
        }
    }

    async updateChallenges(idChallenge, name, description, startDate, endDate) {
        try {
            console.log(idChallenge, name, description, startDate, endDate);
            const connection = await this.connect();
            const queryUpdate =
                "UPDATE challenges SET name = ?, description = ?, startDate = ?, endDate = ? WHERE idChallenge = ?";

            const [resultUpdate] = await connection.query(queryUpdate, [name, description, startDate, endDate, idChallenge]);

            const isAffectedRow = resultUpdate.affectedRows > 0;
            return {
                'success': isAffectedRow,
                'message': isAffectedRow ? 'Successful' : 'Do not update challenges'
            }
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    }

    async deleteChallenge(idUser, idChallenge) {
        const connection = await this.connect();
        const queryInsert =
            "DELETE FROM challenges WHERE idChallenge = ? AND idUser = ?";

        const [results] = await connection.query(queryInsert, [idChallenge, idUser]);

        const isAffectedRow = results.affectedRows > 0;

        return {
            'success': isAffectedRow,
            'message': isAffectedRow ? 'Successful' : 'Do not delete challenges'
        }
    }

    async getChallenge(idUser, idChallenge) {
        try {
            const connection = await this.connect();

            const combinedQuery = `
            SELECT COUNT(libraries.idLib) AS quantity
            FROM challenges
            LEFT JOIN libraries ON 
                libraries.modifiedTime BETWEEN 
                    CONCAT(challenges.startDate, ' ', '00:00:00') AND 
                    CONCAT(challenges.endDate, ' ', '23:59:59')
            WHERE challenges.idUser = ? AND challenges.idChallenge = ? AND libraries.status = 'COMPLETED';
            
            `;

            const [combinedResults] = await connection.query(combinedQuery, [idUser, idChallenge]);

            return {
                success: true,
                quantity: combinedResults[0].quantity || 0
            };
        } catch (error) {
            // Handle database errors
            console.error("Error in getChallenge:", error);
            return { success: false, message: 'Internal server error' };
        }
    }



}

module.exports = new Challenges();