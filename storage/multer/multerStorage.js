 
const multer = require("multer");
const path = require("path");
const { avatarStorage, videoCourseStorage } = require("./store");

// defining file storage system using multer package
// /** For Images */


// profile avatar
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");



// /** For Videos */
// MULTER storage middleware for videos
/**For Videos */

const uploadVideoCourse = multer({
  storage: videoCourseStorage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /mp4|3gp/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("video");

module.exports = {
  uploadAvatar,
  uploadVideoCourse
}