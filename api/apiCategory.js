const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");



router.post('/addCategory', async (req, res) => {
    await CategoryController.createCategory(req, res);
});

router.get('/getCategory', async (req, res) => {
    await CategoryController.getCategory(req, res);
});

router.post('/addFavCategory/', async (req, res) => {
    await categoryController.createCategoryFav(req, res);
});

router.get('/getCategoryFav/:idUser', async (req, res) => {
    await categoryController.getCategoryFav(req, res);
});

router.delete('/deleteCategoryFav/', async (req, res) => {
    await categoryController.deleteCategoryFav(req, res);
});

module.exports = router;