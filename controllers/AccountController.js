const nodemailer = require("nodemailer");
const user = require("../models/User");
const randomString = require("randomstring");


const transporter = nodemailer.createTransport({
    host: "mail.openjavascript.info",
    port: 465,
    service: true,
    service: "gmail",
    auth: {
        user: "bookreadertlu3@gmail.com",
        pass: "iheb ndhu kspq dnom",
    },
});

class AccountController {
    registerUser(req, res) {
        try {
            const { email, fullName, birthDay, password, rePassword, role } = req.body;

            const name = fullName.trim();
            const formattedEmail = email.trim().toLowerCase();

            user.createUser(formattedEmail, name, birthDay || new Date(2000, 1, 1), password, role || "user")
                .then((result) => {
                    res.json(result);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                    res.json({
                        success: false,
                        error: user.message,
                    });
                });
        } catch (error) {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        }
    }

    getInfoUser(req, res) {
        try {
            const idUser = req.params.idUser;
            if (!idUser) {
                return res.json({
                    success: false,
                    error: "Missing input parameters...",
                });
            }
            user.getInfo(idUser)
                .then((result) => {
                    res.json(result);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                    res.json({
                        success: false,
                        error: user.message,
                    });
                });
        } catch (error) {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        }
    }

    updateInfoUser(req, res) {
        try {
            const { idUser, email, fullName, birthDay, role } = req.body;

            if (!idUser || !email || !fullName || !birthDay || !role) {
                return res.json({
                    success: false,
                    error: "Missing input parameters...",
                });
            }
            user.updateUser(idUser, email, fullName, birthDay, role)
                .then((result) => {
                    res.json(result);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                    res.json({
                        success: false,
                        error: user.message,
                    });
                });
        } catch (error) {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        }
    }

    authLogin(req, res) {
        try {
            const { email, password } = req.body;


            user.authLogin(email, password)
                .then((result) => {
                    res.json(result);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                    res.json({
                        success: false,
                        error: user.message,
                    });
                });
        } catch (error) {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        }
    }

    forgotPassword(req, res) {
        try {
            const { email } = req.body;

            const otp = randomString.generate({
                length: 6,
                charset: "numeric",
            });

            // user.insertIntoActiveKey(email, otp).then((result) => {
            //     if (!result.success) {
            //         return res.json({ result });
            //     }
            // });
            user.isExistsEmail(email).then(result => {
                if (!result) {
                    res.json({
                        success: false,
                        error: "Account does not exist"
                    })
                }
            });

            user.insertIntoActiveKey(email, otp);

            const mailOptions = {
                from: "bookreadertlu3@gmail.com",
                to: email,
                subject: "Reset Password OTP",
                text: `Your OTP for password reset is: ${otp}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    res.json({
                        success: false,
                        error: "Failed to send OTP email",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "OTP sent successfully",
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        }
    }

    authOTP(req, res) {
        const { email, otp } = req.body;

        user.authOTP(email, otp)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                res.json({
                    success: false,
                    error: user.message,
                });
            });
    }

    resetPassword(req, res) {
        const { email, newPassword, otp, rePassword } = req.body;

        user.resetPassword(email, newPassword, otp)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                res.json({
                    success: false,
                    error: user.message,
                });
            });
    }

    changePassword(req, res) {
        const { idUser, curPassword, newPassword, rePassword } = req.body;

        user.updatePassword(idUser, curPassword, newPassword)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                res.json({
                    success: false,
                    error: "An error occurred while processing the request.",
                });
            });
    }
}

module.exports = new AccountController();
