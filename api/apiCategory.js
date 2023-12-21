const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");



router.post('/addCategory', async (req, res) => {
    await CategoryController.createCategory(req, res);
});

router.get('/getCategory', async (req, res) => {
    await CategoryController.getCategory(req, res);
});

router.post('/addCategoryFav/', async (req, res) => {
    await CategoryController.createCategoryFav(req, res);
});

router.get('/getCategoryFav/:idUser', async (req, res) => {
    await CategoryController.getCategoryFav(req, res);
});

router.delete('/deleteCategoryFav/', async (req, res) => {
    await CategoryController.deleteCategoryFav(req, res);
});

router.get('/getCategoryUserInterest/:idUser', async (req, res) => {
    await CategoryController.getTopicUserInterest(req, res);
})
module.exports = router;