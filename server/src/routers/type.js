const express = require("express");
const router = express.Router();
const TypeController = require("../app/controller/TypeController");

router.get("/", TypeController.index);
router.get("/:slugCat/:slugType", TypeController.getMoviesBySlugCatAndSlugType);
router.post("/store", TypeController.store);
router.put("/:id", TypeController.update);
router.delete("/:id", TypeController.destroy);

module.exports = router;
