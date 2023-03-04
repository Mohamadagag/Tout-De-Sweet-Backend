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

router.get("/", controller.getAllProducts); /* Get products based on the selected category */
router.get("/allproducts", controller.fetchProducts); /* Get All products */
router.get("/randomfive", controller.randomFive);  /* Get random products */
router.get("/last", controller.lastFour); /* Get last four */
router.get("/:id", controller.getOneProduct); /* Get single product based on the id */
router.post("/", upload.array("image", 6), controller.post); /* Add new product*/

module.exports = router;
