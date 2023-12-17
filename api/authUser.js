const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/createUser", async (req, res) => {
    try {
        const { email, fullName, password, rePassword, role } = req.body;

        if (!email || !fullName | !password || !rePassword) {
            return res.json({
                success: false,
                error: "Missing input parameters..."
            });
        }

        if (password !== rePassword) {
            return res.json({
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

        res.json({ result });
    } catch (error) {
        console.error("Error while creating user:", error);
        res.json({
            error: "An error occurred while processing the request.",
        });
    }
});

router.post("/authLogin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            success: false,
            error: "Missing input parameters..."
        });
    }

    const user = new User();
    const result = await user.authLogin(email, password);

    res.json(result);
});

module.exports = router;
