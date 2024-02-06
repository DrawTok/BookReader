const { validate } = require("email-validator");
const Database = require("./Database");
const crypto = require("crypto");

const curSeconds = Math.floor(new Date().getTime() / 1000);
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

            if (results.length > 0) return { success: true, userData: results[0] };
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
            const isExistsEmail = await this.isExistsEmail(email);

            if (!isExistsEmail) {
                return { success: false, error: "Account does not exist" };
            }

            const [userData] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

            const hashedPassword = userData[0].password;

            const inputPasswordHash = await crypto.createHash("sha256").update(password).digest("hex");

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

            const [emailExists] = await connection.query("SELECT COUNT(email) as count FROM users WHERE email = ?", [email]);

            return emailExists[0].count > 0 ? true : false;
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

            const [countEmails] = await connection.query("SELECT COUNT(*) AS count FROM users WHERE email = ?", [email]);

            if (countEmails[0].count > 0) {
                return { success: false, error: "Email already exists..." };
            }

            const hashedPassword = await crypto.createHash("sha256").update(password).digest("hex");

            const query = "INSERT INTO users (email, fullName, birthDay, password, role) VALUES (?, ?, ?, ?, ?)";
            const [results] = await connection.query(query, [email, fullName, birthDay, hashedPassword, role]);

            const queryGet = "SELECT * FROM users WHERE email = ?";
            const [userData] = await connection.query(queryGet, [email]);

            if (results.affectedRows > 0) {
                return { success: true, message: "Successful", userData };
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

            const queryOldPassword = "SELECT password FROM users WHERE idUser = ?";
            const [oldPasswordRows] = await connection.query(queryOldPassword, [idUser]);
            const oldPassword = oldPasswordRows[0]?.password;

            const curPasswordHash = crypto.createHash("sha256").update(curPassword).digest("hex");

            const passwordMatch = curPasswordHash === oldPassword;
            if (passwordMatch) {
                const hashedPassword = await crypto.createHash("sha256").update(newPassword).digest("hex");
                const queryUpdatePassword = "UPDATE users SET password = ? WHERE idUser = ?";
                const [results] = await connection.query(queryUpdatePassword, [hashedPassword, idUser]);

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

    async insertIntoActiveKey(email, code) {

        if (!await this.isExistsEmail(email)) {
            return {
                success: false,
                message: "Account does not exist"
            }
        }

        const connection = await this.connect();

        try {
            const querySelect = "SELECT email, code, time FROM active_key WHERE email = ?";
            const [existingRecord] = await connection.query(querySelect, [email]);

            let query;

            if (!existingRecord.length) {
                query = "INSERT INTO active_key (email, code, time) VALUES (?, ?, ?)";
                const values = [email, code, curSeconds];

                await connection.query(query, values);
            } else {
                query = "UPDATE active_key SET code = ?, time = ? WHERE email = ?";

                await connection.query(query, [code, curSeconds, email]);
            }

            connection.end();
        } catch (error) {
            console.error("Error inserting/updating into active_key:", error);
        }
    }

    async authOTP(email, otp) {
        const connection = await this.connect();

        const query = "SELECT code, time FROM active_key WHERE email = ?";
        const [resultOTP] = await connection.query(query, [email]);
        connection.end();
        if (resultOTP[0]?.code === otp) {
            const timeRemaining = curSeconds - resultOTP[0]?.time;
            if (timeRemaining <= 120 && timeRemaining >= 0) {
                return {
                    success: true,
                    message: "OTP authentication successful.",
                };
            } else
                return {
                    success: false,
                    message: "OTP has expired.",
                };
        }
        return {
            success: false,
            message: "OTP is incorrect. Please try again.",
        };
    }

    async resetPassword(email, newPassword, otp) {
        try {
            const connection = await this.connect();

            const query = "SELECT code FROM active_key WHERE email = ?";
            const [resultOTP] = await connection.query(query, [email]);
            if (resultOTP[0]?.code === otp) {
                const hashedPassword = await crypto.createHash("sha256").update(newPassword).digest("hex");

                const [resultUpdatePassword] = await connection.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

                connection.end();

                if (resultUpdatePassword.affectedRows > 0) {
                    this.deleteActiveKey(email);
                    return {
                        success: true,
                        message: "Password updated successfully.",
                    };
                } else {
                    return {
                        success: false,
                        message: "User not found. Password update failed.",
                    };
                }
            } else {
                console.error("Error resetting password:", error.message);
                return {
                    success: false,
                    message: "An error occurred during password reset.",
                };
            }
        } catch (error) {
            console.error("Error resetting password:", error.message);
            return {
                success: false,
                message: "An error occurred during password reset.",
            };
        }
    }

    async deleteActiveKey(email) {
        const connection = await this.connect();

        try {
            const query = "DELETE FROM active_key WHERE email = ?";
            const [result] = await connection.query(query, [email]);

            if (result.affectedRows > 0) {
                console.log("Deleted active key successfully");
            } else {
                console.log("No active key found for the specified email");
            }
        } catch (error) {
            console.error("Error deleting active key:", error);
        } finally {
            connection.end();
        }
    }
}

module.exports = new User();
