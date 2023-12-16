const User = require("../models/User");
const express = require('express');
const router = express.Router();

router.use(express.json());

const handleResponse = (res, result) => {
    res.json({ result });
};

const handleError = (res, error) => {
    console.error('An error occurred:', error);
    res.json({
        success: false,
        error: 'An error occurred while processing the request.'
    });
};

router.get('/getInfoUser/:idUser', async (req, res) => {
    try {
        const idUser = req.params.idUser;
        if (!idUser) {
            return res.json({
                success: false,
                error: 'Missing input parameters...'
            });
        }
        const user = new User();
        const infoUser = await user.getInfo(idUser);
        if (infoUser.success) {
            res.json(infoUser);
        } else {
            res.json({
                success: false,
                error: infoUser.message
            });
        }
    } catch (error) {
        handleError(res, error);
    }
});

router.post('/updateInfoUser', async (req, res) => {
    try {
        const { idUser, email, fullName, birthDay, role } = req.body;

        if (!idUser || !email || !fullName || !birthDay || !role) {
            return res.json({
                success: false,
                error: 'Missing input parameters...'
            });
        }
        const newUser = new User();
        const result = await newUser.updateUser(idUser, email, fullName, birthDay, role);

        handleResponse(res, result);

    } catch (error) {
        handleError(res, error);
    }
});

router.post('/updatePassword', async (req, res) => {
    try {
        const { idUser, curPassword, newPassword } = req.body;

        if (!idUser || !curPassword || !newPassword) {
            return res.json({
                success: false,
                error: 'Missing input parameters...'
            });
        }
        const newUser = new User();
        const result = await newUser.updatePassword(idUser, curPassword, newPassword);

        handleResponse(res, result);

    } catch (error) {
        handleError(res, error);
    }
});


module.exports = router;