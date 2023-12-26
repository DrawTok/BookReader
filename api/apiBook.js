const express = require('express');
const router = express.Router();
const BookController = require("../controllers/BookController");

router.get('/getLikeCategory/', async (req, res) => {
    await BookController.fetchData(req, res);
});

router.post('/getBookDetail/:bookId', async (req, res) => {
    await BookController.getBookDetailById(req, res);
});

router.post('/search/', async (req, res) => {
    await BookController.search(req, res);
});

router.post('/updateStatus/', async (req, res)=>{
    await BookController.updateStatus(req, res);
})

module.exports = router;
