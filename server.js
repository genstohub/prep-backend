const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api", apiRoutes);

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log(`Oh hey developer, the server started running on port ${port}`);
  console.log("happy coding, good luck");
});

// ""
//     ?
// /
