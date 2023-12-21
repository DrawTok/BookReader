const express = require('express');
const router = express.Router();
const LibraryController = require("../controllers/LibraryController");

router.post('/saveReadingProcess/', async (req, res) => {
    await LibraryController.saveReadingProcess(req, res);
});

module.exports = router;