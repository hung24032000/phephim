const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    images: {
        imageCarousel: {
            type: String,
        },
        image: [
            {
                type: String,
            },
        ],
    },
    catId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "category",
    },
    typeMovieId: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "type",
        },
    ],
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    ratting: {
        type: Number,
        max: [5, "Maximum 5"],
        min: [0, "Minimum 0"],
        default: 5,
    },
    views: {
        type: Number,
        default: 0,
    },
    chapter: {
        totalChapter: {
            type: Number,
            default: 0,
        },
        currentChapter: {
            type: Number,
            default: 0,
        },
        chapterList: [
            {
                name: {
                    type: String,
                    required: true,
                },
                id_video: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    releaseYear: {
        type: Number,
    },
    status: {
        type: Number,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Movie = mongoose.model("movie", MovieSchema);

module.exports = Movie;
