const express = require('express');
const router = express.Router();
const DictionaryController = require("../controllers/DictionaryController");

router.post('/addNewWord/', async (req, res) => {
    await DictionaryController.addNewWord(req, res);
});

module.exports = router;