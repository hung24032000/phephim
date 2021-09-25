const Category = require("../models/Category");
const Movie = require("../models/Movie");
const Type = require("../models/Type");
class TypeController {
    // POST -- api/type/
    // Get All Types
    // public

    async index(req, res) {
        try {
            const types = await Type.find({}).select("-movies");
            res.json({
                success: true,
                data: types,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request!" });
        }
    }
    // POST -- api/type/store
    // Create Type
    // Private

    async store(req, res) {
        try {
            const TypeStore = req.body;
            const { name } = req.body;

            if (!name)
                return res.json({
                    success: false,
                    message: "Please enter a Type name.",
                });
            const findType = await Type.find({ name });
            if (findType.length) {
                return res.status(400).json({
                    success: false,
                    message: "Type name already exists",
                });
            }
            const store = await Type.create(TypeStore);
            res.json({
                success: true,
                message: "Type created successfully",
                data: store,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // POST -- api/type/update
    // Register User
    // Public

    async update(req, res) {
        const { name, slug } = req.body;
        if (!name)
            return res.json({
                success: false,
                message: "Please enter a Type name.",
            });
        try {
            const findType = await Type.find({ name });
            console.log(findType);
            if (findType.length) {
                return res.status(400).json({
                    success: false,
                    message: "Type name already exists",
                });
            }

            const TypeUpdate = {
                name,
                slug,
            };
            const TypeStore = await Type.findOneAndUpdate(
                { _id: req.params.id },
                TypeUpdate,
                { new: true }
            );
            if (!TypeStore)
                return res.status(401).json({
                    success: false,
                    message: "Type not found or user not authorised",
                });
            res.json({
                success: true,
                message: "Type updated successfully",
                data: TypeStore,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // DELETE -- api/Type/:id
    // Delete User
    // Public

    async destroy(req, res) {
        try {
            const DeleteCondition = {
                _id: req.params.id,
            };
            const deleted = await Type.findOneAndDelete(DeleteCondition);
            if (!deleted) {
                return res.status(401).json({
                    success: false,
                    message: "Type not found or user not authorised",
                });
            }
            res.json({ success: true, message: "Deleted", data: deleted });
        } catch (error) {
            console.log(error);
        }
    }

    // GET -- api/type/:slugCat/:slugType
    // Get All Movie By Type
    // public
    async getMoviesBySlugCatAndSlugType(req, res) {
        try {
            console.log("getMoviesBySlugCatAndSlugType");
            let slugCat = req.params.slugCat;
            let slugType = req.params.slugType;
            let limit = req.query.limit || 20; // số lượng Movie xuất hiện trên 1 page
            let page = req.query.page || 1;
            limit = parseInt(limit, 10);
            page = parseInt(page, 10);
            let totalPage = 0;
            const category = await Category.findOne({ slug: slugCat });
            const catId = category._id;
            const types = await Type.findOne({ slug: slugType });
            let moviesId = types.movies;
            let totalMovieFind = await Movie.find({
                _id: { $in: moviesId },
                catId,
            }).count();
            totalPage = Math.ceil(totalMovieFind / limit);
            await Movie.find({
                _id: { $in: moviesId },
                catId,
            })
                .select(
                    "name images slug status chapter.totalChapter createdAt"
                )
                .sort("-createdAt")
                .skip(limit * page - limit)
                .limit(limit)
                .exec((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: "Invalid request!",
                        });
                    }
                    res.json({
                        success: true,
                        totalMovie: totalMovieFind,
                        limit,
                        totalPage,
                        currentPage: page,
                        data: data,
                    });
                });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request!" });
        }
    }
}

module.exports = new TypeController();
