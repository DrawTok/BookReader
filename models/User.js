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

    async authLogin(emailUser, password) {
        try {
            const connection = await this.connect();

            // Check if the email exists
            const isEmailExists = await this.isExistsEmail(emailUser);

            if (!isEmailExists) {
                return { success: false, error: 'Account does not exist' };
            }

            const [userData] = await connection.query("SELECT * FROM users WHERE emailUser = ?", [emailUser]);

            const hashedPassword = userData[0].password;

            const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

            if (!isPasswordMatch) {
                return { success: false, error: 'Invalid password' };
            }

            return { success: true, userData: userData[0].idUser };
        } catch (error) {
            console.error("Error authenticating user: ", error.message);
            throw error;
        }
    }

    async isExistsEmail(emailUser) {
        try {
            const connection = await this.connect();
            const [emailExists] = await connection.query("SELECT COUNT(emailUser) as count FROM users WHERE emailUser = ?", [emailUser]);
            if (emailExists[0].count > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error checking email existence: ", error.message);
            throw error;
        }
    }

    async createUser(nameUser, dob, emailUser, phoneNumber, password) {
        try {
            const connection = await this.connect();

            const [countEmails] = await connection.query("SELECT COUNT(*) AS count FROM users WHERE emailUser = ?", [emailUser]);
            if (countEmails[0].count > 0) {
                return { success: false, error: 'Email already exists...' };
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const query = "INSERT INTO users (idUser, nameUser, dob, emailUser, phoneNumber, password) VALUES (null, ?, ?, ?, ?, ?)";
            const [results] = await connection.query(query, [nameUser, dob, emailUser, phoneNumber, hashedPassword]);
            connection.end();
            if (results.affectedRows > 0) {
                return { success: true, message: "Successful" };
            } else {
                return { success: false, message: "Failed to create user..." };
            }

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
                return { success: true, message: "Successful" };
            } else {
                return { success: false, message: "Failed to update user..." };
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
                connection.end();

                if (results.affectedRows > 0) {
                    return { success: true, message: "Successful" };
                } else {
                    return { success: false, message: "Failed to update password..." };
                }

            } else {
                connection.end();
                return false;
            }
        } catch (error) {
            console.error("Cannot update password: ", error.message);
            throw error;
        }
    }

}

module.exports = User;