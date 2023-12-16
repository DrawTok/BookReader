const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/createUser", async (req, res) => {
    try {
        const { email, fullName, password, rePassword, role } = req.body;

        if (!email || !fullName | !password || !rePassword) {
            return res
                .status(400)
                .json({ success: false, error: "Missing input parameters..." });
        }

        if (password !== rePassword) {
            return res.status(400).json({
                success: false,
                error: "The two passwords are not the same.",
            });
        }

        const newUser = new User();
        const result = await newUser.createUser(
            email,
            fullName,
            password,
            role || "user"
        );

        res.status(result.success ? 201 : 500).json({ result });
    } catch (error) {
        console.error("Error while creating user:", error);
        res.status(500).json({
            error: "An error occurred while processing the request.",
        });
    }
});

router.post("/authLogin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, error: "Missing input parameters..." });
    }

    const user = new User();
    const result = await user.authLogin(email, password);

    res.status(result.success ? 200 : 401).json(result);
});

module.exports = router;
