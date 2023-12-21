const express = require('express');
const router = express.Router();
const BookController = require("../controllers/BookController");

router.get('/getLikeCategory/', async (req, res) => {
    await BookController.fetchData(req, res);
});

router.post('/getBookDetail/:bookId', async (req, res) => {
    await BookController.getBookDetailById(req, res);
});

router.post('/saveLastPageReading/', async (req, res) => {
    await BookController.saveLastPageReading(req, res);
});

router.post('/searchByNameAndCategory/', async (req, res) => {
    await BookController.searchByNameAndCategory(req, res);
});

module.exports = router;
