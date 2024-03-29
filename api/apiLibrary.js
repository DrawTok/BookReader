const express = require("express");
const router = express.Router();
const LibraryController = require("../controllers/LibraryController");

router.post("/saveReadingProcess/", async (req, res) => {
    await LibraryController.saveReadingProcess(req, res);
});

router.get("/getBookByStatus/:idUser/:status", async (req, res) => {
    await LibraryController.getBookByStatus(req, res);
});

router.delete("/deleteBookmark/", async (req, res) => {
    await LibraryController.deleteBookmark(req, res);
});

module.exports = router;
