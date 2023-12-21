
const category = require("../models/Category");

class CategoryController {

    createCategory(req, res) {
        try {
            const { idCategory, name } = req.body;
            if (!idCategory || !name) {
                return res.json({
                    success: false,
                    error: "Missing input parameters..."
                });
            }

            // Use await to wait for the asynchronous operation to complete
            category.addNewCategory(idCategory, name).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: 'An error occurred while processing the request.'
                });
            });

        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }


    //updateCategory(req, res) { }

    getCategory(req, res) {
        try {
            category.getCategory().then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: 'An error occurred while processing the request.'
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }

    createCategoryFav(req, res) {
        try {
            const { idUser, favCatIds } = req.body;

            if (!idUser || !favCatIds || favCatIds.length === 0) {
                return res.json({
                    success: false,
                    error: "Missing input parameters..."
                });
            }

            // Use await to wait for the asynchronous operation to complete
            category.addCategoryFavorite(idUser, favCatIds).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: 'An error occurred while processing the request.'
                });
            });

        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }


    //updateCategory(req, res) { }

    getCategoryFav(req, res) {
        try {
            const { idUser } = req.params;
            category.getCategoryFavorite(idUser).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: 'An error occurred while processing the request.'
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }

    deleteCategoryFav(req, res) {
        try {
            const { idUser, favCatIds } = req.body;

            if (!idUser || !favCatIds || favCatIds.length === 0) {
                return res.json({
                    success: false,
                    error: "Missing input parameters..."
                });
            }

            category.deleteCategoryFavorite(idUser, favCatIds).then(result => {
                res.json(result);
            }).catch(error => {
                console.error('An error occurred:', error);
                res.json({
                    success: false,
                    error: 'An error occurred while processing the request.'
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            res.json({
                success: false,
                error: 'An error occurred while processing the request.'
            });
        }
    }
}

module.exports = new CategoryController();