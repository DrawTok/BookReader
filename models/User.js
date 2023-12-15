const Database = require("./Database")
const bcrypt = require('bcrypt');
class User extends Database {

    constructor() {
        super();
    }

    async getInfo(idUser) {
        try {
            const connection = await this.connect();
            const query = "SELECT nameUser, dob, emailUser, phoneNumber FROM users WHERE idUser = ?";
            const [results] = await connection.query(query, [idUser]);
            connection.end();
            if (results.length > 0)
                return { success: true, userData: results[0] };
            else
                return { success: false, message: "User not found" };
        } catch (error) {
            console.error("Error get info user: ", error.message);
            throw error;
        }
    }

    async createUser(nameUser, dob, emailUser, phoneNumber, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const connection = await this.connect();
            const query = "INSERT INTO users (idUser, nameUser, dob, emailUser, phoneNumber, password) VALUES (null, ?, ?, ?, ?, ?)";
            const [results] = await connection.query(query, [nameUser, dob, emailUser, phoneNumber, hashedPassword]);
            connection.end();
            return { success: true };
        } catch (error) {
            console.error("Cannot create new user: ", error.message);
            throw error;
        }
    }

    async updateUser(idUser, nameUser, dob, emailUser, phoneNumber) {
        try {
            const connection = await this.connect();
            const query = "UPDATE users SET nameUser = ?, dob = ?, emailUser = ?, phoneNumber = ? WHERE idUser = ?";
            const [results] = await connection.query(query, [nameUser, dob, emailUser, phoneNumber, idUser]);
            connection.end();
            if (results.affectedRows > 0) {
                return { success: true };
            } else {
                return { success: false, message: "User not found or no changes made" };
            }
        } catch (error) {
            console.error("Cannot update user: ", error.message);
            throw error;
        }
    }

    async updatePassword(idUser, curPassword, newPassword) {
        try {
            const connection = await this.connect();

            const queryOldPassword = "SELECT password FROM users WHERE idUser = ?";
            const [oldPasswordRows] = await connection.query(queryOldPassword, [idUser]);
            const oldPassword = oldPasswordRows[0]?.password;

            const passwordMatch = await bcrypt.compare(curPassword, oldPassword);
            if (passwordMatch) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const queryUpdatePassword = "UPDATE users SET password = ? WHERE idUser = ?";
                const [results] = await connection.query(queryUpdatePassword, [hashedPassword, idUser]);

                if (results.affectedRows > 0) {
                    connection.end();
                    return { success: true };
                } else {
                    connection.end();
                    return { success: false, message: "Unable to update new password" };
                }
            } else {
                connection.end();
                return { success: false, message: "Current password does not match" };
            }
        } catch (error) {
            console.error("Cannot update password: ", error.message);
            throw error;
        }
    }

}

module.exports = User;