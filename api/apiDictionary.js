const express = require('express');
const router = express.Router();
const DictionaryController = require("../controllers/DictionaryController");

router.post('/addNewWord/', async (req, res) => {
    await DictionaryController.addNewWord(req, res);
});

router.get('/getDictionary/:idUser', async (req, res) => {
    await DictionaryController.getDictionary(req, res);
});

module.exports = router;