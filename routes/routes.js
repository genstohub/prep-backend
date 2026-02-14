const router = require("express").Router();

// The users routes are splitted base on profile position for better access

const adminUserRoute = require("../controllers/users/admin");
const workerUserRoute = require("../controllers/users/worker");
const instructorUserRoute = require("../controllers/users/instructor");
const studentUserRoute = require("../controllers/users/student");

const signinRoute = require("../controllers/auth/signin");
const signUpRoute = require("../controllers/auth/singup");
const sessionRoute = require("../controllers/auth/session");
const logoutRoute = require("../controllers/auth/logout");

const courseRoute = require("../controllers/courses/courses.js");
const courseMaterialRoute = require("../controllers/courses/courseMaterials.js")

router.use("/user/admin", adminUserRoute);
router.use("/user/worker", workerUserRoute);
router.use("/user/instructor", instructorUserRoute);
router.use("/user/student", studentUserRoute);

router.use("/auth_sign", signinRoute);
router.use("/auth_create", signUpRoute);
router.use("/auth_session", sessionRoute);
router.use("/auth_logout", logoutRoute)

router.use("/courses", courseRoute);
router.use("/courses/materials", courseMaterialRoute);

module.exports = router;
