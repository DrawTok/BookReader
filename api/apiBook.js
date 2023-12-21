const express = require('express');
const router = express.Router();
const BookController = require("../controllers/BookController");

router.get('/getLikeCategory/', async (req, res) => {
    await BookController.fetchData(req, res);
});

router.post('/getDataCategoryId/:categoryId', async (req, res) => {
    await BookController.getDataCategoryId(req, res);
});

router.post('/saveLastPageReading/', async (req, res) => {
    await BookController.saveLastPageReading(req, res);
});

router.post('/searchByNameAndCategory/', async (req, res) => {
    await BookController.searchByNameAndCategory(req, res);
});

module.exports = router;
