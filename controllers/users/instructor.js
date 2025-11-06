const instructor = require("express").Router();

instructor.get("/test", async (req, res) => {
  res.json("instructor in users got it");
});

module.exports = instructor;
