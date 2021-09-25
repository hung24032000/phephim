const express = require("express");
const app = express();
const cors = require("cors");
const routers = require("./routers/index");
require("dotenv").config();
const db = require("./../utils/connectDB");
app.use("/profile", express.static("src/uploads"));
// const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: "./src/uploads",
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + file.originalname);
//     },
// });
// const upload = multer({ storage }).array();
// app.use(upload);
// for parsing application/json
app.use(express.json());
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

app.use(cors());

db.connectDB();

routers(app);

const port = process.env.PORT || 8080;
const host = process.env.HOST || "http://localhost";
app.listen(port, console.log(`Server Started on port ${host}:${port}`));
