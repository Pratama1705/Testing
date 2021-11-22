const multer = require('multer');

/**
 * @description: accept image file format
 */
const fileFilter = (req, file, callback) => {
  // accept image
  if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
    callback(null, true);
  } else {
  // reject photo
    callback(null, false);
  }
}

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

module.exports = uploadImage;
