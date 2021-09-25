const Category = require("../models/Category");
const Type = require("../models/Type");
const Movie = require("../models/Movie");
const ObjectId = require("mongodb").ObjectID;

const getIdCat = async (slug) => {
    let category = await Category.find({ slug: slug }).select("_id");
    console.log(category[0]._id);
    return category[0]._id;
};

class MovieController {
    // GET -- api/movie/
    // Get All Movies
    // public
    async index(req, res) {
        try {
            let { limit } = req.query || 0; // số lượng sản phẩm xuất hiện trên 1 page
            let { page } = req.query;
            limit = parseInt(limit, 10);
            page = parseInt(page, 10);
            Movie.find() // find tất cả các data
                .select("name images slug status chapter.totalChapter")
                .skip(limit * page - limit) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(limit)
                .exec((err, data) => {
                    Movie.countDocuments((err, count) => {
                        // đếm để tính có bao nhiêu trang
                        if (err) return next(err);
                        res.json({
                            success: true,
                            limit,
                            page,
                            data,
                        }); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                    });
                });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request!" });
        }
    }

    // GET -- api/movie/:slug
    // Get by Name
    // public
    async getBySlug(req, res) {
        try {
            console.log("Get by Slug");
            const movie = await Movie.findOne({ slug: req.params.slug }).select(
                "-createdAt -chapter.chapterList -__v"
            );
            const type = await Type.find({
                _id: { $in: movie.typeMovieId },
            }).select("name slug");
            console.log(type);
            const catMovie = await Category.findOne({
                _id: movie.catId,
            }).select(" name slug");
            console.log(catMovie);
            const data = {
                movie,
                type,
                catMovie,
            };
            res.json({
                success: true,
                data,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request!" });
        }
    }

    // POST -- api/movie/store
    // Create Movie
    // Private
    async store(req, res) {
        try {
            const movie = req.body;
            //handle images
            let images = { imageCarousel: "", image: [] };
            if (
                req.files["images.imageCarousel"] &&
                req.files["images.image"]
            ) {
                images.imageCarousel =
                    req.files["images.imageCarousel"][0].filename;
                for (let image of req.files["images.image"]) {
                    images.image.push(image.filename);
                }
                console.log("2 objects # null");
            } else if (req.files["images.image"]) {
                for (let image of req.files["images.image"]) {
                    images.image.push(image.filename);
                }
            } else if (req.files["images.imageCarousel"]) {
                images.imageCarousel =
                    req.files["images.imageCarousel"][0].filename;
            }

            movie.images = images;
            //
            let TypeMovieId = [];
            if (!Array.isArray(movie.typeMovieId)) {
                TypeMovieId.push(new ObjectId(movie.typeMovieId));
                console.log("Not is array");
            } else if (Array.isArray(movie.typeMovieId)) {
                console.log("Is array");
                TypeMovieId = movie.typeMovieId.map((id) => new ObjectId(id));
            }
            movie.typeMovieId = TypeMovieId;

            const movieStore = await Movie.create(movie);
            await Type.updateMany(
                { _id: { $in: TypeMovieId } },
                { $push: { movies: movieStore._id } }
            );
            await Category.updateOne(
                { _id: movie.catId },
                { $push: { movies: movieStore._id } }
            );
            res.json({
                success: true,
                message: "Movie created successfully",
                data: movieStore,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
    // Put -- api/movie/update:id
    // Register User
    // Public

    async update(req, res) {
        try {
            let movieUpdate = req.body;
            let images = { imageCarousel: "", image: [] };
            if (
                req.files["images.imageCarousel"] &&
                req.files["images.image"]
            ) {
                images.imageCarousel =
                    req.files["images.imageCarousel"][0].filename;
                for (let image of req.files["images.image"]) {
                    images.image.push(image.filename);
                }
                movieUpdate.images = images;
                console.log("2 objects # null");
            } else if (req.files["images.image"]) {
                for (let image of req.files["images.image"]) {
                    images.image.push(image.filename);
                }
                movieUpdate.images.image = images;
            } else if (req.files["images.imageCarousel"]) {
                images.imageCarousel =
                    req.files["images.imageCarousel"][0].filename;
            }

            let findMovieBySlug = await Movie.findOne({ _id: req.params.slug });
            let TypeMovieId = [];
            if (!Array.isArray(movieUpdate.typeMovieId)) {
                TypeMovieId.push(new ObjectId(movieUpdate.typeMovieId));
            } else if (Array.isArray(movieUpdate.typeMovieId)) {
                TypeMovieId = movieUpdate.typeMovieId.map(
                    (id) => new ObjectId(id)
                );
            }
            movieUpdate.typeMovieId = TypeMovieId;
            ////catId
            if (
                JSON.stringify(findMovieBySlug.catId) !==
                JSON.stringify(movieUpdate.catId)
            ) {
                //remove in array
                const removeCatId = await Category.updateOne(
                    { _id: findMovieBySlug.catId },
                    { $pull: { movies: ObjectId(req.params.id) } }
                );
                ///update
                await Category.updateOne(
                    { _id: movieUpdate.catId },
                    { $push: { movies: ObjectId(req.params.id) } }
                );
            }
            //TypeId

            if (
                JSON.stringify(findMovieBySlug.typeMovieId) !==
                JSON.stringify(movieUpdate.typeMovieId)
            ) {
                console.log("#");
                //remove in array
                const removeTypeMovieId = await Type.updateMany(
                    { _id: { $in: findMovieBySlug.typeMovieId } },
                    { $pull: { movies: ObjectId(req.params.id) } }
                );
                ///update
                await Type.updateMany(
                    { _id: { $in: TypeMovieId } },
                    { $push: { movies: ObjectId(req.params.id) } }
                );
            }
            const MovieStore = await Movie.findOneAndUpdate(
                { slug: req.params.slug },
                movieUpdate,
                { new: true }
            );
            if (!MovieStore)
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            res.json({
                success: true,
                message: "Movie updated successfully",
                data: MovieStore,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // Put -- api/movie/:slug/chapter
    // Create 1 chap
    // private
    async createChapter(req, res) {
        try {
            let chapterUpdate = req.body;
            chapterUpdate.totalChapter = parseInt(
                chapterUpdate.totalChapter,
                10
            );
            chapterUpdate.totalChapter = parseInt(
                chapterUpdate.totalChapter,
                10
            );
            const MovieStore = await Movie.findOneAndUpdate(
                { slug: req.params.slug },
                {
                    $push: {
                        "chapter.chapperList": chapterUpdate.chapperList[0],
                    },
                    $set: {
                        "chapter.currentChapter": +1,
                    },
                },
                { new: true }
            );
            res.json({
                success: true,
                message: "Movie Chapter updated successfully",
                data: MovieStore,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // // Put -- api/movie/:slug/chapterMultiple
    // // create multiple chapters
    // // private
    // async createMultipleChapter(req, res) {
    //     try {
    //         let chapterUpdate = req.body;
    //         chapterUpdate.totalChapter = parseInt(
    //             chapterUpdate.totalChapter,
    //             10
    //         );
    //         const MovieStore = await Movie.findOneAndUpdate(
    //             { slug: req.params.slug },
    //             {
    //                 $push: {
    //                     "chapter.chapperList": {
    //                         $each: chapterUpdate.chapperList,
    //                     },
    //                 },
    //             },
    //             { new: true }
    //         );
    //         res.json({
    //             success: true,
    //             message: "Movie Chapter updated successfully",
    //             data: MovieStore,
    //         });
    //     } catch (error) {
    //         console.log(error.message);
    //         res.status(500).json({
    //             success: false,
    //             message: "Internal server error",
    //         });
    //     }
    // }

    // Put -- api/movie/:slug/chapter/:idChap
    // Edit Chapter --
    // private
    async editChapter(req, res) {
        console.log("editChapter");
        try {
            let chapterUpdate = req.body;
            let idChap = req.params.idChap;

            let slug = req.params.slug;
            console.log(chapterUpdate);
            const MovieStore = await Movie.updateOne(
                { slug, "chapter.chapperList._id": idChap },
                {
                    $set: {
                        "chapter.chapperList.$.name": chapterUpdate.name,
                        "chapter.chapperList.$.id_video":
                            chapterUpdate.id_video,
                    },
                },
                { new: true }
            );
            res.json({
                success: true,
                message: "Movie Chapter updated successfully",
                data: MovieStore,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // POST -- api/category/update
    // Register User
    // Public
    async destroy(req, res) {
        try {
            const DeleteCondition = {
                _id: req.params.id,
            };
            const deleted = await Movie.findOneAndDelete(DeleteCondition, {
                $set: {
                    "chapter.currentChapter": -1,
                },
            });
            await Category.updateOne(
                { _id: deleted.catId },
                { $pull: { movies: ObjectId(req.params.id) } }
            );
            await Type.updateMany(
                { _id: { $in: deleted.typeMovieId } },
                {
                    $pull: { movies: ObjectId(req.params.id) },
                }
            );
            console.log(deleted);
            if (!deleted) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            res.json({ success: true, message: "Deleted", data: deleted });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/nominations
    // Get
    // Public
    async Movienominations(req, res) {
        console.log("http://localhost:8080/api/movie/nominations");
        try {
            const moviesNominations = await Movie.find({})
                .select("-chapter.chapperList")
                .sort({ createAt: 1 })
                .limit(8);
            if (!moviesNominations) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }

            res.json({
                success: true,
                message: "Request Success Fully",
                data: moviesNominations,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/phim-le
    // Get
    // Public
    async OddMovies(req, res) {
        console.log("http://localhost:8080/api/movie/phim-le");
        let slug = "phim-le";
        try {
            let catId = await getIdCat(slug);
            const OddMovies = await Movie.find({ catId })
                .select(
                    "-chapter.chapperList -releaseYear -typeMovieId  -__v -status"
                )
                .sort({
                    createdAt: 1,
                })
                .limit(8);
            console.log(OddMovies);
            if (!OddMovies) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            res.json({
                success: true,
                message: "Request Success Fully",
                data: OddMovies,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/phim-bo
    // Get
    // Public
    async seriesMovies(req, res) {
        console.log("http://localhost:8080/api/movie/phim-bo");
        let slug = "phim-bo";
        try {
            let catId = await getIdCat(slug);
            const seriesMovies = await Movie.find({
                catId,
            })
                .select(
                    "-chapter.chapperList -releaseYear -typeMovieId  -__v -status"
                )
                .limit(8);
            if (!seriesMovies) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            1;
            res.json({
                success: true,
                message: "Request Success Fully",
                data: seriesMovies,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/phim-hoat-hinh
    // Get
    // Public
    async cartoonMovies(req, res) {
        console.log("http://localhost:8080/api/movie/phim-hoat-hinh");
        let slug = "phim-hoat-hinh";
        try {
            let catId = await getIdCat(slug);
            const seriesMovies = await Movie.find({
                catId,
            })
                .select(
                    "-chapter.chapterList -releaseYear -typeMovieId  -__v -status"
                )
                .limit(8);
            if (!seriesMovies) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            1;
            res.json({
                success: true,
                message: "Request Success Fully",
                data: seriesMovies,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/sort-view/:slug
    // Get
    // Public
    async sortViewMovies(req, res) {
        let slug = req.params.slug;
        console.log(`http://localhost:8080/api/movie/sort-view/${slug}`);
        try {
            let catId = await getIdCat(slug);
            const sortViewMovies = await Movie.find({
                catId,
            })
                .sort({ views: 1 })
                .select("name images slug views")
                .limit(5);
            if (!sortViewMovies) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            res.json({
                success: true,
                message: "Request Success Fully",
                data: sortViewMovies,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/upcomingMovie
    // Get
    // Public
    async carouselMovie(req, res) {
        console.log("http://localhost:8080/api/movie/carouselMovie");
        const querry = {
            "images.imageCarousel": { $exists: true },
            // "chapter.currentChapter": { $gte: 1 },
        };
        try {
            const carouselMovie = await Movie.find(querry)
                // .select("name images slug views")
                .limit(5);
            if (!carouselMovie) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            res.json({
                success: true,
                message: "Request Success Fully",
                data: carouselMovie,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/chapterGte1
    // Get
    // Public
    async lastThreeChapter(req, res) {
        console.log("http://localhost:8080/api/movie/:slug/lastThreeChapter");
        let slug = req.params.slug;
        try {
            const lastThreeChapter = await Movie.findOne(
                { slug },
                { "chapter.chapterList": { $slice: -3 } }
            ).select("-images -typeMovieId -ratting -views -status");
            if (!lastThreeChapter) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            res.json({
                success: true,
                message: "Request Success Fully",
                data: lastThreeChapter,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // GET -- api/movie/upcomingMovie
    // Get
    // Public
    async upcomingMovie(req, res) {
        console.log("http://localhost:8080/api/movie/upcomingMovie");
        try {
            const upcomingMovie = await Movie.find({ status: 0 })
                .select("name images slug views")
                .limit(5);
            if (!upcomingMovie) {
                return res.status(401).json({
                    success: false,
                    message: "Movie not found or user not authorised",
                });
            }
            1;
            res.json({
                success: true,
                message: "Request Success Fully",
                data: upcomingMovie,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new MovieController();
