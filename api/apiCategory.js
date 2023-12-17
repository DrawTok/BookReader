const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");



router.post('/addCategory', async (req, res) => {
    await CategoryController.createCategory(req, res);
});

router.get('/getCategory', async (req, res) => {
    await CategoryController.getCategory(req, res);
});

module.exports = router;