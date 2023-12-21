const library = require("../models/Library");

class LibraryController{

    saveReadingProcess(req, res){
        const { idUser, idBook, status } = req.body;

        if (!idUser || !idBook || !status) {
            this.handleError(res, 'Missing input parameters...');
            return;
        }

        library.saveBookRead(idUser, idBook, status).then(result => res.json(result))
            .catch(error => this.handleError
                (res, 'Please check your network connection and try again.'));
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