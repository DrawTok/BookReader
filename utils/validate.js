const { check } = require("express-validator");

const userValidationRules = {
    signup: [
        check("email").not().isEmpty().withMessage("Email is required."),
        check("email").isEmail().withMessage("Invalid email format."),
        check("fullName").not().isEmpty().withMessage("Name is required."),
        check("fullName").isLength({ max: 50 }).withMessage("The length of the name must be less than or equal to 50 characters."),
        check("fullName")
            .matches(/^[a-zA-Z\s']+$/)
            .withMessage("The name cannot contain special characters."),
        check("password").not().isEmpty().withMessage("Password is required."),
        check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
        check("password").matches(/[\W_]/).withMessage("Password must contain at least one special character."),
        check("password").matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter."),
        check("password").matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter."),
        check("password").matches(/[0-9]/).withMessage("Password must contain at least one number."),
        check("rePassword").not().isEmpty().withMessage("Please re-enter your password."),
        check("rePassword")
            .custom((value, { req }) => value === req.body.password)
            .withMessage("The two passwords do not match."),
    ],
};

const validate = {
    ...userValidationRules,
};

module.exports = validate;
// const nameRegex = /^[a-zA-Z\s']+$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// function validateRegistration(name, email, password, rePassword) {
//     const errors = [];

//     const nameError = checkName(name);
//     const emailError = checkEmail(email);
//     const passwordError = checkPassword(password);
//     const rePasswordError = checkRePassword(password, rePassword);

//     if (nameError) errors.push(nameError);
//     if (emailError) errors.push(emailError);
//     if (passwordError) errors.push(passwordError);
//     if (rePasswordError) errors.push(rePasswordError);

//     return {
//         success: errors.length === 0,
//         errors: errors
//     };
// }

// function validateLogin(email) {
//     const errors = [];

//     const emailError = checkEmail(email);

//     if (emailError) errors.push(emailError);

//     return {
//         success: errors.length === 0,
//         errors: errors
//     };
// }

// function checkName(name) {
//     if (!name) {
//         return "Name is required.";
//     }
//     if (name.length > 50) {
//         return "The length of the name must be less than or equal to 50 characters.";
//     }
//     if (!nameRegex.test(name)) {
//         return "The name cannot contain special characters.";
//     }
//     return '';
// }

// function checkEmail(email) {
//     if (!email) {
//         return "Email is required.";
//     }
//     if (!emailRegex.test(email)) {
//         return "Invalid email format.";
//     }
//     return '';
// }

// function checkPassword(password) {
//     if (!password) {
//         return "Password is required.";
//     }
//     if (password.length < 8) {
//         return "Password must be at least 8 characters long.";
//     }
//     if (!passwordRegex.test(password)) {
//         return "Password must contain at least 8 characters including lowercase letters, uppercase letters, numbers, and special characters.";
//     }
//     return '';
// }

// function checkRePassword(password, rePassword) {
//     if (!rePassword) {
//         return "Please re-enter your password.";
//     }
//     if (password !== rePassword) {
//         return "The two passwords do not match.";
//     }
//     return '';
// }

// module.exports = { validateRegistration, validateLogin, checkPassword };
