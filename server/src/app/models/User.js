const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter an username"],
        unique: true,
    },
    firstname: {
        type: String,
        required: [true, "Please enter an fistname"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter lastname"],
    },
    age: {
        type: Number,
        required: [true, "Please enter age"],
        min: [18, "Age>17"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        lowercase: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Please enter an phone"],
        minLength: 10,
    },
    password: {
        type: String,
        required: [true, "Please enter an password"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
