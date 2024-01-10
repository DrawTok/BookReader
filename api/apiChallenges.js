const express = require("express");
const router = express.Router();
const ChallengesController = require('../controllers/ChallengesController');


router.post('/createNewChallenge/', async (req, res) => {
    await ChallengesController.createNewChallenge(req, res);
});

router.post('/updateChallenge/', async (req, res) => {
    await ChallengesController.updateChallenge(req, res);
});

router.delete('/deleteChallenge/', async (req, res) => {
    await ChallengesController.deleteChallenge(req, res);
});

router.get('/getChallenge/', async (req, res) => {
    await ChallengesController.getChallenge(req, res);
});

module.exports = router;

