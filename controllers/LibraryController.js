const library = require("../models/Library");

class LibraryController {

    saveReadingProcess(req, res) {
        const { idUser, idBook, status, lastPageReading, modifiedDate } = req.body;

        if (!idUser || !idBook || !status) {
            this.handleError(res, 'Missing input parameters...');
            return;
        }

        library.saveBookRead(idUser, idBook, status, lastPageReading, modifiedDate).then(result => res.json(result))
            .catch(error => this.handleError
                (res, 'Please check your network connection and try again.'));
    }

    getBookByStatus(req, res) {
        const { idUser, status } = req.params;
        if (!idUser || !status) {
            this.handleError(res, 'Missing input parameters...');
            return;
        }

        library.getBookByStatus(idUser, status).then(result => res.json(result))
            .catch(error => this.handleError
                (res, 'Please check your network connection and try again.'));
    }

    deleteBookmark(req, res) {
        const { idUser, idBook } = req.body;
        if (!idUser || !idBook) {
            this.handleError(res, 'Missing input parameters...');
            return;
        }

        library.deleteBookmark(idUser, idBook).then(result => res.json(result))
            .catch(error => this.handleError(res, error.errorMessage));
    }

    handleError(res, errorMessage) {
        console.error('An error occurred:', errorMessage);
        res.json({
            success: false,
            error: 'An error occurred. ' + errorMessage
        });
    }

}

module.exports = new LibraryController();