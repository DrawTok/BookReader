const express = require('express');
const router = express.Router();
const categoryFavController = require("../controllers/CategoryFavController");



router.post('/addCategoryFavorite/', async (req, res) => {
    await categoryFavController.createCategoryFav(req, res);
});

router.get('/getCategoryFavorite/:idUser', async (req, res) => {
    await categoryFavController.getCategoryFav(req, res);
});

module.exports = router;