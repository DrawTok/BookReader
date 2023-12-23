const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");


router.post('/addCategory', async (req, res) => {
    await CategoryController.createCategory(req, res);
});

router.get('/getCategory', async (req, res) => {
    await CategoryController.getCategory(req, res);
});

router.post("/addFavCategory/", async (req, res) => {
    await CategoryController.createFavCategory(req, res);
});

router.get("/getFavCategory/:idUser", async (req, res) => {
    await CategoryController.getFavCategory(req, res);
});

router.delete("/deleteFavCategory/", async (req, res) => {
    await CategoryController.deleteFavCategory(req, res);
});

router.get("/getUserInterestCategory/:idUser", async (req, res) => {
    await CategoryController.getUserInterestTopic(req, res);
});
module.exports = router;