var express = require("express");
var router = express.Router();
var controller = require("../controllers/product");
const multer = require("multer");
const path = require("path");

const DIR = "./public/images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/", controller.getAllProducts);
router.get("/last", controller.lastFour);
router.get("/:id", controller.getOneProduct);
router.post("/", upload.array("image", 6), controller.post);

module.exports = router;
