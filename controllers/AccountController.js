const nodemailer = require("nodemailer");
const user = require("../models/User");
const randomString = require("randomstring");
const { validateRegistration,
    validateLogin,
    checkPassword } = require("../utils/validate");
const { json } = require("body-parser");

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
            if (!email || !fullName | !password || !rePassword) {
                return res.json({
                    success: false,
                    error: "Missing input parameters...",
                });
            }

            const name = fullName.trim();
            const formattedEmail = email.trim().toLowerCase();

            const error = validateRegistration(name, formattedEmail, password, rePassword);
            if (!error.success) {
                return res.json(error);
            }
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

    updatePassword(req, res) {
        try {
            const { idUser, curPassword, newPassword } = req.body;

            if (!idUser || !curPassword || !newPassword) {
                return res.json({
                    success: false,
                    error: "Missing input parameters...",
                });
            }

            const error = checkPassword(newPassword);
            if (error) {
                return res.json(
                    {
                        success: false,
                        error: error
                    }
                )
            }

            user.updatePassword(idUser, curPassword, newPassword)
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

            if (!email || !password) {
                return res.json({
                    success: false,
                    error: "Missing input parameters...",
                });
            }

            const error = validateLogin(email);
            if (!error.success) {
                return res.json(error);
            }

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
            const email = req.params.email;
            if (!email) {
                return res.json({
                    success: false,
                    error: "Missing input parameters...",
                });
            }

            const otp = randomString.generate({
                length: 6,
                charset: "numeric",
            });

            user.insertIntoActiveKey(email, otp).then(result => {
                if (!result.success) {
                    return res.json({ result });
                }
            });

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
                    console.log("Email sent: " + info.response);
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
        if (!email) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        if (!otp) {
            return res.json({
                success: false,
                error: "OTP cannot be blank...",
            });
        }

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
        if (!email || !newPassword || !otp || !rePassword) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        const error = checkPassword(newPassword);
        if (error) {
            return res.json(
                {
                    success: false,
                    error: error
                }
            )
        }

        if (rePassword !== newPassword) {
            return res.json({
                success: false,
                error: "The two passwords are not the same.",
            });
        }

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
        if (!idUser || !curPassword || !newPassword || !rePassword) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        const error = checkPassword(newPassword);
        if (error) {
            return res.json(
                {
                    success: false,
                    error: error
                }
            )
        }

        if (rePassword !== newPassword) {
            return res.json({
                success: false,
                error: "The two passwords are not the same.",
            });
        }

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
