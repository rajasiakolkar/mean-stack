const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ex = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ex);
  }
});

module.exports = multer({ storage: storage }).single("image");
