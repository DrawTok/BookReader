const User = require("../models/User");
const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/createUser', async (req, res) => {
    try {
        const { nameUser, dob, emailUser, phoneNumber, password } = req.body;

        if (!nameUser || !dob || !emailUser || !phoneNumber || !password) {
            return res.status(400).json({ success: false, error: 'Missing input parameters...' });
        }
        const newUser = new User();
        const result = await newUser.createUser(nameUser, dob, emailUser, phoneNumber, password);

        res.status(result.success ? 201 : 500).json({ result });

    } catch (error) {
        console.error('Error while creating user:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

router.post('/authLogin', async (req, res) => {
    const { emailUser, password } = req.body;
    if (!emailUser || !password) {
        return res.status(400).json({ success: false, error: 'Missing input parameters...' });
    }

    const user = new User();
    const result = await user.authLogin(emailUser, password);

    res.status(result.success ? 200 : 401).json(result);
});

module.exports = router;