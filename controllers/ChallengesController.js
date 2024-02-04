const Challenges = require("../models/Challenges");

class ChallengesController {
    getAllChallenges(req, res) {
        const { idUser } = req.params;
        if (!idUser) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Challenges.getAllChallenges(idUser)
            .then((result) => res.json(result))
            .catch((error) => {
                console.error("An error occurred:", error);
                res.json({
                    success: false,
                    error: "An error occurred. " + error,
                });
            });
    }

    createNewChallenge(req, res) {
        const { idUser, name, description, startDate, endDate, target } = req.body;
        if (!idUser || !name || !startDate || !endDate || !target) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Challenges.createNewChallenge(idUser, name, description, startDate, endDate, target)
            .then((result) => res.json(result))
            .catch((error) => {
                console.error("An error occurred:", error);
                res.json({
                    success: false,
                    error: "An error occurred. " + error,
                });
            });
    }

    updateChallenge(req, res) {
        const { idChallenge, name, description, startDate, endDate, target } = req.body;
        if (!idChallenge || !name || !description || !startDate || !endDate || !target) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Challenges.updateChallenges(idChallenge, name, description, startDate, endDate, target)
            .then((result) => res.json(result))
            .catch((error) => {
                console.error("An error at update occurred:", error);
                res.json({
                    success: false,
                    error: "An error occurred. " + error,
                });
            });
    }

    deleteChallenge(req, res) {
        const { idUser, idChallenge } = req.body;
        if (!idUser || !idChallenge) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Challenges.deleteChallenge(idUser, idChallenge)
            .then((result) => res.json(result))
            .catch((error) => {
                console.error("An error at delete occurred:", error);
                res.json({
                    success: false,
                    error: "An error occurred. " + error,
                });
            });
    }

    getChallengeDetails(req, res) {
        const { idUser, idChallenge } = req.body;

        if (!idUser || !idChallenge) {
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Challenges.getChallengeDetails(idUser, idChallenge)
            .then((result) => res.json(result))
            .catch((error) => {
                console.error("An error at get occurred:", error);
                res.json({
                    success: false,
                    error: "An error occurred. " + error,
                });
            });
    }
}

module.exports = new ChallengesController();
