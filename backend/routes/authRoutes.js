const express = require('express');
const { registerUser, loginUser, logoutUser, getMe} = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getMe);

module.exports= router;
