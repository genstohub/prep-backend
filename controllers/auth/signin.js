const signinRoute = require("express").Router();
const db = require("../../database/db");
const bcrypt = require("bcrypt");
const jwtAuth = require("../../middlewares/jwt");

signinRoute.post("/signin", async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  const searchHelper = email ? "email" : "phone_number";

  const searchValue = email ? email : phoneNumber;

  await db("signin")
    .select("hash")
    .where(searchHelper, searchValue)
    .then((hash) => {
      const isValid = bcrypt.compareSync(password, hash[0].hash);
      let category;
      db("users")
        .select("category")
        .where(searchHelper, searchValue)
        .then((cat) => {
          category = cat[0].category;

          const tableToJoinFilter = () => {
            if (category === "student") return "students";
            if (category === "instructor") return "instructors";
            if (category === "worker") return "workers";
            if (category === "admin") return "admins";
          };

          let tableToJoin = tableToJoinFilter();

          if (isValid) {
            db("users")
              .select("*")
              .where(searchHelper, searchValue)
              .join(tableToJoin, "users.user_id", `${tableToJoin}.user_id`)
              .then((user) => {
                const jwt = new jwtAuth().generatedAuthToken(user[0])
                res.cookie("auth", jwt);
                res.json(user[0]);
              })
              .catch((err) => {
                res.status(400).json("something went wrong, try again later");
              });
          } else {
            res.status(400).json("password incorrect");
          }
        })
        .catch(() => res.status(400).json("sorry cant get profile type, please try again"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(
          "user not found, please make sure email or phone number is correct and try again"
        );
    });
});

module.exports = signinRoute;
