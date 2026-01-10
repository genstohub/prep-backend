const logout = require("express").Router();
const db = require("../../database/db");

logout.post("/logout", (req, res) => {
    res.clearCookie("auth", {
httpOnly: true, 
              secure: process.env.NODE_ENV === "production",
              sameSite: "none"
    }); // Ensure options match
    res.json({success: true});
});

module.exports = logout