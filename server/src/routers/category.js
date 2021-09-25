const express = require("express");
const router = express.Router();
const CategoryController = require("../app/controller/CategoryController");

router.get("/", CategoryController.index);
router.post("/store", CategoryController.store);

router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);

module.exports = router;
