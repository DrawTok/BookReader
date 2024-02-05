const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/AccountController");
const validate = require("../utils/validate");
const { validationResult } = require("express-validator");

router.get("/getInfoUser/:idUser", async (req, res) => {
    await AccountController.getInfoUser(req, res);
});

router.post("/registerUser", validate.signup, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array()[0].msg });
    }
    await AccountController.registerUser(req, res);
});

router.post("/updateInfoUser", validate.updateInfo, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array()[0].msg });
    }
    await AccountController.updateInfoUser(req, res);
});

router.post("/changePassword", validate.changePassword, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array()[0].msg });
    }
    await AccountController.changePassword(req, res);
});

router.post("/authLogin", validate.signin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array()[0].msg });
    }
    await AccountController.authLogin(req, res);
});

router.post("/forgotPassword/:email", async (req, res) => {
    await AccountController.forgotPassword(req, res);
});

router.post("/authOTP", async (req, res) => {
    await AccountController.authOTP(req, res);
});

router.post("/resetPassword", validate.resetPassword, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array()[0].msg });
    }
    await AccountController.resetPassword(req, res);
});

module.exports = router;
