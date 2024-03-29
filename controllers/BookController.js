const { json } = require("body-parser");
const book = require("../models/Book");

class BookController {
    fetchData(req, res) {
        const { categoryName, quantity } = req.body;

        if (!categoryName || !quantity) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.fetchData(categoryName, quantity)
            .then((result) => res.json(result))
            .catch((error) => this.handleError(res, "Please check your network connection and try again."));
    }

    getBookDetailById(req, res) {
        const bookId = req.params.bookId;
        if (!bookId) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.getBookDetailById(bookId)
            .then((result) => res.json(result))
            .catch((error) => this.handleError(res, "Please check your network connection and try again."));
    }

    getLastPageReading(req, res) {
        const { idUser, idBook } = req.params;
        if (!idUser) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.getLastPageReading(idUser, idBook)
            .then((result) => res.json(result))
            .catch((error) => this.handleError(res, error.errorMessage));
    }

    getLastBookRead(req, res) {
        const { idUser } = req.params;
        if (!idUser) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.getLastBookReading(idUser)
            .then((result) => res.json(result))
            .catch((error) => this.handleError(res, error.errorMessage));
    }

    search(req, res) {
        const { bookName, topic } = req.body;

        book.search(bookName, topic)
            .then((result) => res.json(result))
            .catch((error) => this.handleError(res, "Please check your network connection and try again."));
    }

    updateStatus(req, res) {
        const { idUser, idBook, status } = req.body;
        if (!idUser || !idBook || !status) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.updateStatus(idUser, idBook, status)
            .then((result) => res.json(result))
            .catch((error) => this.handleError(res, error.errorMessage));
    }

    getBookmark(req, res) {
        const { idUser, idBook } = req.params;
        if (!idUser || !idBook) {
            this.handleError(res, "Missing input parameters...");
            return;
        }

        book.getBookmark(idUser, idBook)
            .then((result) => res.json(result))
            .catch((error) => this.handleError(res, error.errorMessage));
    }

    handleError(res, errorMessage) {
        console.error("An error occurred:", errorMessage);
        res.json({
            success: false,
            error: "An error occurred. " + errorMessage,
        });
    }
}

module.exports = new BookController();
