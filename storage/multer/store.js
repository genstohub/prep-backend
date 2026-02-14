const multer = require("multer");
const path = require("path");
const { analyseMulterStorageDestination } = require("../../scripts/multer-script");

// defining file storage system using multer package
// /** For Images */


// profile Picture
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, "av" + Date.now() + path.extname(file.originalname));
  },
});

// videos
const videoCourseStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/videos/video_course");
  },
  filename: (req, file, cb) => {
    cb(null, "vc" + req?.body?.course_code + Date.now() + path.extname(file.originalname));
  },
});

// Material Images store
const materialImageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, analyseMulterStorageDestination("public/images/materials"));
  },
  filename: (req, file, cb) => {
    cb(null, "mi_" + req?.body?.courseCode + "_" + Date.now() + path.extname(file.originalname));
  },
});



module.exports = {
    avatarStorage, videoCourseStorage,materialImageStore
}