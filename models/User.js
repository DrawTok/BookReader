const Database = require("./Database");
const crypto = require("crypto");
class User extends Database {
    constructor() {
        super();
    }

    async getInfo(idUser) {
        let connection;
        try {
            connection = await this.connect();
          
            const query = "SELECT email, fullName, birthDay, role FROM users WHERE idUser = ?";
            const [results] = await connection.query(query, [idUser]);

            if (results.length > 0)
                return { success: true, userData: results[0] };
            else return { success: false, message: "User not found" };
        } catch (error) {
            console.error("Error get info user: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async authLogin(email, password) {
        let connection;
        try {
            connection = await this.connect();

            // Check if the email exists
            const isEmailExists = await this.isExistsEmail(email);

            if (!isEmailExists) {
                return { success: false, error: "Account does not exist" };
            }

            const [userData] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

            const hashedPassword = userData[0].password;

            const inputPasswordHash = await crypto
                .createHash("sha256")
                .update(password)
                .digest("hex");

            const isPasswordMatch = inputPasswordHash === hashedPassword;

            if (!isPasswordMatch) {
                return { success: false, error: "Invalid password" };
            }

            const userDataWithoutPassword = { ...userData[0] };
            delete userDataWithoutPassword.password;

            return { success: true, userData: userDataWithoutPassword };
        } catch (error) {
            console.error("Error authenticating user: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async isExistsEmail(email) {
        let connection;
        try {
            connection = await this.connect();

            const [emailExists] = await connection.query(
                "SELECT COUNT(email) as count FROM users WHERE email = ?",
                [email]
            );


            if (emailExists[0].count > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error checking email existence: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async createUser(email, fullName, birthDay, password, role = "user") {
        let connection;
        try {
            connection = await this.connect();

            const [countEmails] = await connection.query(
                "SELECT COUNT(*) AS count FROM users WHERE email = ?",
                [email]
            );
          
            if (countEmails[0].count > 0) {
                return { success: false, error: "Email already exists..." };
            }

            const hashedPassword = await crypto
                .createHash("sha256")
                .update(password)
                .digest("hex");

            const query =
                "INSERT INTO users (fullName, birthDay, email, password, role) VALUES (?, ?, ?, ?, ?)";
            const [results] = await connection.query(query, [
                fullName,
                birthDay,
                email,
                hashedPassword,
                role,
            ]);


            if (results.affectedRows > 0) {
                return { success: true, message: "Successful" };
            } else {
                return { success: false, message: "Failed to create user..." };
            }
        } catch (error) {
            console.error("Cannot create new user: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async updateUser(idUser, email, fullName, birthDay, role) {
        let connection;
        try {
            connection = await this.connect();

            const query = "UPDATE users SET email = ?, fullName = ?, birthDay = ?, role = ? WHERE idUser = ?";
            const [results] = await connection.query(query, [email, fullName, birthDay, role, idUser]);

            if (results.affectedRows > 0) {
                return { success: true, message: "Successful" };
            } else {
                return { success: false, message: "Failed to update user..." };
            }
        } catch (error) {
            console.error("Cannot update user: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async updatePassword(idUser, curPassword, newPassword) {
        let connection;
        try {
            connection = await this.connect();

            const queryOldPassword =
                "SELECT password FROM users WHERE idUser = ?";
            const [oldPasswordRows] = await connection.query(queryOldPassword, [
                idUser,
            ]);
            const oldPassword = oldPasswordRows[0]?.password;

            const curPasswordHash = crypto
                .createHash("sha256")
                .update(curPassword)
                .digest("hex");

            const passwordMatch = curPasswordHash === oldPassword;
            if (passwordMatch) {
                const hashedPassword = await crypto
                    .createHash("sha256")
                    .update(newPassword)
                    .digest("hex");
                const queryUpdatePassword =
                    "UPDATE users SET password = ? WHERE idUser = ?";
                const [results] = await connection.query(queryUpdatePassword, [
                    hashedPassword,
                    idUser,
                ]);

                if (results.affectedRows > 0) {
                    return { success: true, message: "Successful" };
                } else {
                    return {
                        success: false,
                        message: "Failed to update password...",
                    };
                }
            } else {
                return { success: false, message: "Password is incorrect..." };
            }
        } catch (error) {
            console.error("Cannot update password: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
}

module.exports = User;
