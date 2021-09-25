const jwt = require("jsonwebtoken");
const verifiyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" });
    }
    try {
        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.userId;
        console.log("Decoded token");
        next();
    } catch (error) {
        return res
            .status(403)
            .json({ success: false, message: "Invalid token" });
    }
};

module.exports = verifiyToken;
