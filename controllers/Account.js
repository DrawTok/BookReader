const User = require("../models/User");
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/:idUser', async (req, res) => {
    try {
        const idUser = req.params.idUser;
        if (!idUser) {
            return res.status(400).json({ error: 'Thiếu tham số idUser.' });
        }
        const user = new User();
        const infoUser = await user.getInfo(idUser);
        if (!infoUser) {
            return res.status(404).json({ error: 'Người dùng không tồn tại.' });
        }
        res.json({ infoUser });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xử lý yêu cầu.' });
    }
});

router.post('/:nameUser/:dob/:emailUser/:phoneNumber/:password', async (req, res) => {
    try {
        const nameUser = req.params.nameUser;
        const dob = req.params.dob;
        const emailUser = req.params.emailUser;
        const phoneNumber = req.params.phoneNumber;
        const password = req.params.password;

        if (!nameUser || !dob || !emailUser || !phoneNumber || !password) {
            return res.status(400).json({ error: 'Thiếu tham số đầu vào...' });
        }
        const user = new User();
        const infoUser = await user.getInfo(idUser);
        if (!infoUser) {
            return res.status(404).json({ error: 'Người dùng không tồn tại.' });
        }
        res.json({ infoUser });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xử lý yêu cầu.' });
    }
});



module.exports = router;