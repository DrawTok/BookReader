const express = require('express');
const router = express.Router();
const AccountController = require("../controllers/AccountController");

router.get('/getInfoUser/:idUser', async (req, res) => {
    await AccountController.getInfoUser(req, res);
});

router.post('/registerUser', async (req, res) => {
    await AccountController.registerUser(req, res);
});

router.post('/updateInfoUser', async (req, res) => {
    await AccountController.updateInfoUser(req, res);
});

router.post('/updatePassword', async (req, res) => {
    await AccountController.updatePassword(req, res);
});

router.post('/authLogin', async (req, res) => {
    await AccountController.authLogin(req, res);
});

module.exports = router;