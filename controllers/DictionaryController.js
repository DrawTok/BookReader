const Dictionary = require("../models/Dictionary");

class DictionaryController {
    addNewWord(req, res) {
        try {
            const { idUser, word } = req.body;
            if (!word) {
                return res.json({
                    success: false,
                    error: "Missing input parameters...",
                });
            }

            Dictionary.addNewWord(idUser, word).then(result => {
                return res.json(result)
            }).catch(error => {
                console.error("An error occurred:", error);
                res.json({
                    success: false,
                    error: "An error occurred while processing the request.",
                });
            });

        } catch (error) {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        }
    }

    getDictionary(req, res) {
        const idUser = req.params.idUser;
        if (!idUser) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Dictionary.getDictionary(idUser).then(result => {
            return res.json(result)
        }).catch(error => {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        });
    }

    deleteWord(req, res) {
        const { idUser, word } = req.body;
        if (!idUser || !word) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Dictionary.deleteWord(idUser, word).then(result => {
            return res.json(result)
        }).catch(error => {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        });
    }

    translateWord(req, res){
        const word = req.params.word;
        if(!word){
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Dictionary.translateWord(word).then(result => {
            return res.json(result)
        }).catch(error => {
            console.error("An error occurred:", error);
            res.json({
                success: false,
                error: "An error occurred while processing the request.",
            });
        });
    }
}

module.exports = new DictionaryController();