
const category = require("../models/CategoryFavorite");

class CategoryController {

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
}

module.exports = new CategoryController();