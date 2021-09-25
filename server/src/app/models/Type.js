const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TypeMovieSchema = new Schema({
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

const TypeMovie = mongoose.model("type", TypeMovieSchema);

module.exports = TypeMovie;
