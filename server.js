require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/routes");
const jwtAuthentification = require("./middlewares/jwt");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const jwtAuth = new jwtAuthentification();

app.use(jwtAuth.normalAuthWithCookie); // a middleware to attend in any api call so it must store the user authenticated info to req.user if exist. but dont mistake it with isAuthenticated method.

app.get("", (req, res) => {
  res.json(req.user)
});

app.use("/api", apiRoutes);

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log(`Oh hey developer, the server started running on port ${port}`);
  console.log("happy coding, good luck");
});

// ""
//     ?
// /
