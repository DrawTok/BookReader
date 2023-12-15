const User = require("../models/User");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/bookReader/controllers/Account.js', async (req, res) => {
    try {
        const idUser = 1;
        if (!idUser) {
            return res.status(400).json({ error: 'Thiếu tham số idUser.' });
        }
        const infoUser = await User.findById(idUser);
        if (!infoUser) {
            return res.status(404).json({ error: 'Người dùng không tồn tại.' });
        }
        res.json({ infoUser });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xử lý yêu cầu.' });
    }
})