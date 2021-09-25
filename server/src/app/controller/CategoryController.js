const Category = require("../models/Category");
class CategoryController {
    // POST -- api/category/
    // Get All Categories
    // public

    async index(req, res) {
        try {
            const categories = await Category.find({});
            res.json({
                success: true,
                data: categories,
            });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid request!" });
        }
    }
    // POST -- api/category/store
    // Create Category
    // Private

    async store(req, res) {
        try {
            const categoryStore = req.body;
            const { name } = req.body;

            if (!name)
                return res.json({
                    success: false,
                    message: "Please enter a category name.",
                });
            const findCategory = await Category.find({ name });
            if (findCategory.length) {
                return res.status(400).json({
                    success: false,
                    message: "Category name already exists",
                });
            }
            const store = await Category.create(categoryStore);
            res.json({
                success: true,
                message: "Category created successfully",
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

    // POST -- api/category/update
    // Register User
    // Public

    async update(req, res) {
        const { name, slug } = req.body;
        if (!name)
            return res.json({
                success: false,
                message: "Please enter a category name.",
            });
        try {
            const findCategory = await Category.find({ name });
            console.log(findCategory);
            if (findCategory.length) {
                return res.status(400).json({
                    success: false,
                    message: "Category name already exists",
                });
            }

            const categoryUpdate = {
                name,
                slug,
            };
            const categoryStore = await Category.findOneAndUpdate(
                { _id: req.params.id },
                categoryUpdate,
                { new: true }
            );
            if (!categoryStore)
                return res.status(401).json({
                    success: false,
                    message: "Category not found or user not authorised",
                });
            res.json({
                success: true,
                message: "Category updated successfully",
                data: categoryStore,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // DELETE -- api/category/:id
    // Delete User
    // Public

    async destroy(req, res) {
        try {
            const DeleteCondition = {
                _id: req.params.id,
            };
            const deleted = await Category.findOneAndDelete(DeleteCondition);
            if (!deleted) {
                return res.status(401).json({
                    success: false,
                    message: "Category not found or user not authorised",
                });
            }
            res.json({ success: true, message: "Deleted", data: deleted });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CategoryController();
