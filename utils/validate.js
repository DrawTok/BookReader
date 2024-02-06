const { check } = require("express-validator");

const userValidationRules = {
    signup: [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email")
            .not().isEmpty().withMessage("Email is required.")
            .isEmail().withMessage("Invalid email format.")
            .custom((value, { req }) => {
                const username = value.split('@')[0];
                if (!/^[a-z][a-zA-Z0-9]*$/.test(username)) {
                    throw new Error("Username must start with a lowercase letter and contain only letters and numbers.");
                }
                
                return true;
            }),
        check("fullName").custom(value => {
            if (value.trim() === '') {
                throw new Error("Name is required.");
            }
            return true;
        }),
        check("fullName").isLength({ max: 50 }).withMessage("The length of the name must be less than or equal to 50 characters."),
        check("fullName")
            .matches(/^[a-zA-Z\s']+$/)
            .withMessage("The name cannot contain special characters."),
        check("password").not().isEmpty().withMessage("Password is required."),
        check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
        check("password").matches(/[\W_]/).withMessage("Password must contain at least one special character."),
        check("rePassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        })
    ],

    signin: [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email")
            .not().isEmpty().withMessage("Email is required.")
            .isEmail().withMessage("Invalid email format.")
            .custom((value, { req }) => {
                const username = value.split('@')[0];
                if (!/^[a-z][a-zA-Z0-9]*$/.test(username)) {
                    throw new Error("Username must start with a lowercase letter and contain only letters and numbers.");
                }
                return true;
            }),
        check("password").not().isEmpty().withMessage("Password is required."),
    ],

    updateInfo: [
        check("fullName").custom(value => {
            if (value.trim() === '') {
                throw new Error("Name is required.");
            }
            return true;
        }),
        check("fullName").isLength({ max: 50 }).withMessage("The length of the name must be less than or equal to 50 characters."),
        check("fullName")
            .matches(/^[a-zA-Z\s']+$/)
            .withMessage("The name cannot contain special characters."),
    ],

    changePassword: [
        check("curPassword").not().isEmpty().withMessage("Password is required."),
        check("newPassword").not().isEmpty().withMessage("Password is required."),
        check("newPassword").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
        check("newPassword").matches(/[\W_]/).withMessage("Password must contain at least one special character."),
        check("rePassword").custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Passwords do not match");
            }
            return true;
        })
    ],

    resetPassword: [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email")
            .not().isEmpty().withMessage("Email is required.")
            .isEmail().withMessage("Invalid email format.")
            .custom((value, { req }) => {
                const username = value.split('@')[0];
                if (!/^[a-z][a-zA-Z0-9]*$/.test(username)) {
                    throw new Error("Username must start with a lowercase letter and contain only letters and numbers.");
                }
                return true;
            }),
        check("newPassword").not().isEmpty().withMessage("Password is required."),
        check("newPassword").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
        check("newPassword").matches(/[\W_]/).withMessage("Password must contain at least one special character."),
        check("rePassword").custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
        check("otp").not().isEmpty().withMessage("OTP is required")
    ],
    forgotPassword: [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email")
            .not().isEmpty().withMessage("Email is required.")
            .isEmail().withMessage("Invalid email format.")
            .custom((value, { req }) => {
                const username = value.split('@')[0];
                if (!/^[a-z][a-zA-Z0-9]*$/.test(username)) {
                    throw new Error("Username must start with a lowercase letter and contain only letters and numbers.");
                }
                return true;
            })
    ],
    authOTP: [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email")
            .not().isEmpty().withMessage("Email is required.")
            .isEmail().withMessage("Invalid email format.")
            .custom((value, { req }) => {
                const username = value.split('@')[0];
                if (!/^[a-z][a-zA-Z0-9]*$/.test(username)) {
                    throw new Error("Username must start with a lowercase letter and contain only letters and numbers.");
                }
                return true;
            }),
        check("otp").not().isEmpty().withMessage("OTP cannot be blank...")
    ]
};

const validate = {
    ...userValidationRules,
};

module.exports = validate;
