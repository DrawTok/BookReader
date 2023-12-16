const User = require("../models/User");
const express = require('express');
const router = express.Router();

router.use(express.json());

const handleResponse = (res, result) => {
    const status = result.success ? 200 : 500;
    res.status(status).json({ result });
};

router.get('/getInfoUser/:idUser', async (req, res) => {
    try {
        const idUser = req.params.idUser;
        if (!idUser) {
            return res.status(400).json({ error: 'Missing input parameters...' });
        }
        const user = new User();
        const infoUser = await user.getInfo(idUser);
        if (infoUser.success) {
            res.json(infoUser);
        } else {
            res.status(404).json({ error: infoUser.message });
        }
    } catch (error) {
        console.error('Error while retrieving user information:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

router.post('/updateInfoUser', async (req, res) => {
    try {
        const { idUser, email, fullName, birthDay, role } = req.body;

        if (!idUser || !email || !fullName || !birthDay || !role) {
            return res.status(400).json({ error: 'Missing input parameters...' });
        }
        const newUser = new User();
        const result = await newUser.updateUser(idUser, email, fullName, birthDay, role);

        handleResponse(res, result);

    } catch (error) {
        console.error('Error while updating user:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

router.post('/updatePassword', async (req, res) => {
    try {
        const { idUser, curPassword, newPassword } = req.body;

        if (!idUser || !curPassword || !newPassword) {
            return res.status(400).json({ error: 'Missing input parameters...' });
        }
        const newUser = new User();
        const result = await newUser.updatePassword(idUser, curPassword, newPassword);

        handleResponse(res, result);

    } catch (error) {
        console.error('Error while updating password:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});


module.exports = router;