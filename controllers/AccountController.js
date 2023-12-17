
const user = require("../models/User");

class AccountController {


    registerUser(req, res) {
        try {
            const { email, phoneNumber, fullName, birthDay, password, rePassword, role } = req.body;
            if (!email || !fullName | !password || !rePassword) {
                return res.json({
                    success: false,
                    error: "Missing input parameters..."
                });
            }

            if (password !== rePassword) {
                return res.json({
                    success: false,
                    error: "The two passwords are not the same.",
                });
            }

            user.createUser(
                email,
                phoneNumber || "NULL",
                fullName,
                birthDay,
                password,
                role || "user"
            ).then(result => {
                res.json(result);

            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: user.message
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }

    getInfoUser(req, res) {
        try {
            const idUser = req.params.idUser;
            if (!idUser) {
                return res.json({
                    success: false,
                    error: 'Missing input parameters...'
                });
            }
            user.getInfo(idUser).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: user.message
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }

    updateInfoUser(req, res) {
        try {
            const { idUser, email, fullName, birthDay, role } = req.body;

            if (!idUser || !email || !fullName || !birthDay || !role) {
                return res.json({
                    success: false,
                    error: 'Missing input parameters...'
                });
            }
            user.updateUser(idUser, email, fullName, birthDay, role).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: user.message
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }

    updatePassword(req, res) {
        try {
            const { idUser, curPassword, newPassword } = req.body;

            if (!idUser || !curPassword || !newPassword) {
                return res.json({
                    success: false,
                    error: 'Missing input parameters...'
                });
            }
            user.updatePassword(idUser, curPassword, newPassword).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: user.message
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }

    authLogin(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.json({
                    success: false,
                    error: "Missing input parameters..."
                });
            }

            user.authLogin(email, password).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: user.message
                });
            });

        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }
}

module.exports = new AccountController();