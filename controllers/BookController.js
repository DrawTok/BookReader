const { json } = require("body-parser");
const book = require("../models/Book")



class BookController {

    fetchData(req, res) {
        const { categoryName, quantity } = req.body;

        if (!categoryName || !quantity) {
            this.handleError(res, 'Missing input parameters...');
            return;
        }

        book.fetchData(categoryName, quantity).then(result => res.json(result))
            .catch(error => this.handleError
                (res, 'Please check your network connection and try again.'));

    }

    getDataCategoryId(req, res) {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            this.handleError(res, 'Missing input parameters...');
            return;
        }

        book.getDataCategoryId(categoryId).then(result => res.json(result))
            .catch(error => this.handleError
                (res, 'Please check your network connection and try again.'));
    }

    saveLastPageReading(req, res) {
        const { idUser, idBook, lastPageReading } = req.body;
        if (!idUser || !idBook || !lastPageReading) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.saveReading(idUser, idBook, lastPageReading)
            .then(result => res.json(result))
            .catch(error => this.handleError(res, "Please check your network connection and try again."));
    }

    searchByNameAndCategory(req, res) {
        const { nameBook, categoryName } = req.body;
        if (!categoryName || !nameBook) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.searchByNameAndCategory(nameBook, categoryName)
            .then(result => res.json(result))
            .catch(error => this.handleError(res, "Please check your network connection and try again."));
    }

    handleError(res, errorMessage) {
        console.error('An error occurred:', errorMessage);
        res.json({
            success: false,
            error: 'An error occurred. ' + errorMessage
        });
    }
}

module.exports = new BookController();