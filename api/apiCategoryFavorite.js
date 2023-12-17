const express = require('express');
const router = express.Router();
const categoryFavController = require("../controllers/CategoryFavController");



router.post('/addCategoryFav/', async (req, res) => {
    await categoryFavController.createCategoryFav(req, res);
});

router.get('/getCategoryFav/:idUser', async (req, res) => {
    await categoryFavController.getCategoryFav(req, res);
});

router.delete('/deleteCategoryFav/', async (req, res) => {
    await categoryFavController.deleteCategoryFav(req, res);
});

module.exports = router;