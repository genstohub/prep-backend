const logout = require("express").Router();
const db = require("../../database/db");

logout.post("/logout", (req, res) => {
    res.clearCookie("auth", { path: "/" }); // Ensure options match
    res.send("Cookie cleared, logged out.");
});

module.exports = logout