const router = require("express").Router();


// The users routes are splitted base on profile position for better access

const adminUserRoute = require("../controllers/users/admin");
const workerUserRoute = require("../controllers/users/worker");
const instructorUserRoute = require("../controllers/users/instructor");
const studentUserRoute = require("../controllers/users/student");

const signinRoute = require("../controllers/auth/signin");

router.use("/user/admin", adminUserRoute);
router.use("/user/worker", workerUserRoute);
router.use("/user/instructor", instructorUserRoute);
router.use("/user/student", studentUserRoute);

router.use("/auth_sign", signinRoute);

module.exports = router;
