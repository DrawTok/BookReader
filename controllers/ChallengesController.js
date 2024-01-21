const Challenges = require("../models/Challenges");
const { json } = require("body-parser");

class ChallengesController {
<<<<<<< HEAD
    createNewChallenge(req, res) {
        const { idUser, name, description, startDate, endDate, target } = req.body;
        if (!idUser || !name || !description
            || !startDate || !endDate || !target) {
=======
    getAllChallenges(req, res) {
        const { idUser } = req.params;
        if (!idUser) {
>>>>>>> 44acadd5fec6edcf7eab19835cba7e76a9aa8ae7
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

<<<<<<< HEAD
        Challenges.createNewChallenge(idUser, name, description, startDate, endDate, target)
            .then(result => res.json(result))
=======
        Challenges.getAllChallenges(idUser)
            .then((result) => res.json(result))
>>>>>>> 44acadd5fec6edcf7eab19835cba7e76a9aa8ae7
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
<<<<<<< HEAD
        if (!idChallenge || !name || !description
            || !startDate || !endDate || !target) {
=======
        if (!idChallenge || !name || !description || !startDate || !endDate || !target) {
>>>>>>> 44acadd5fec6edcf7eab19835cba7e76a9aa8ae7
            return res.json({
                success: false,
                error: "Missing input parameters...",
            });
        }

        Challenges.updateChallenges(idChallenge, name, description, startDate, endDate, target)
<<<<<<< HEAD
            .then(result => res.json(result))
            .catch(error => {
                console.error('An error at updated occurred:', error);
=======
            .then((result) => res.json(result))
            .catch((error) => {
                console.error("An error at updated occurred:", error);
>>>>>>> 44acadd5fec6edcf7eab19835cba7e76a9aa8ae7
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
