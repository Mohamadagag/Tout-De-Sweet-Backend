const express = require("express");
const router = express.Router();
const controller = require("../controllers/categories");

router.get("/", controller.AllCategories);
router.get("/:id", controller.OneCategory);
router.post("/addNew", controller.post);
router.put("/:id", controller.UpdateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
