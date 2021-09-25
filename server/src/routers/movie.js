const express = require("express");
const router = express.Router();
const Movie = require("../app/controller/MovieController");

router.get("/nominations", Movie.Movienominations);
router.get("/phim-le", Movie.OddMovies);
router.get("/phim-bo", Movie.seriesMovies);
router.get("/phim-hoat-hinh", Movie.cartoonMovies);

router.get("/sort-view/:slug", Movie.sortViewMovies);

router.get("/upcomingMovie", Movie.upcomingMovie);
router.get("/carouselMovie", Movie.carouselMovie);

router.get("/:slug/lastThreeChapter", Movie.lastThreeChapter);

router.get("/:slug", Movie.getBySlug);

router.post("/store", Movie.store);

router.put("/:slug", Movie.update);

router.put("/:slug/chapter", Movie.createChapter);

// router.put("/:slug/chapterMultiple", Movie.createMultipleChapter);

router.put("/:slug/chapter/:idChap", Movie.editChapter);

router.delete("/:id", Movie.destroy);
router.get("/", Movie.index);

module.exports = router;
