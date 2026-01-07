const logout = require("express").Router();
const db = require("../../database/db");

logout.post("/logout", (req, res) => {
    res.clearCookie("auth", { path: "/" }); // Ensure options match
    res.json({success: true});
});

module.exports = logout