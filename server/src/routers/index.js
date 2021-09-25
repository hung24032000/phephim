const authRouter = require("./auth");
const categoryRouter = require("./category");
const typeRouter = require("./type");
const movieRouter = require("./movie");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: "./src/uploads",
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + file.originalname);
    },
});
const upload = multer({ storage }).fields([
    { name: "images.imageCarousel", maxCount: 1 },
    { name: "images.image", maxCount: 4 },
]);
const router = (app) => {
    app.use(upload);
    app.use("/api/auth", authRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/type", typeRouter);
    app.use("/api/movie", movieRouter);
};
module.exports = router;

// app.all("/*", function (req, res, next) {
//     // CORS headers
//     res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//     // Set custom headers for CORS
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Content-type,Accept,X-Access-Token,X-Key"
//     );
//     if (req.method == "OPTIONS") {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });
