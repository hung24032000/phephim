const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: "movie",
        },
    ],
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
