const User = require("../models/User");

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class AuthController {
    // POST -- api/auth/login
    // Register User
    // Public
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: "Missing userame or password",
            });
        try {
            const user = await User.findOne({ username });
            const hashPassword = await argon2.verify(user.password, password);
            if (!user || !hashPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect username or password",
                });
            }
            /// Create Token
            const Token = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );
            return res.json({
                success: true,
                message: "User logged in successfully",
                Token,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }

    // POST -- api/auth/register
    // Register User
    // Public

    async register(req, res) {
        const {
            username,
            password,
            firstname,
            lastname,
            age,
            email,
            phone,
            address,
        } = req.body;
        const UserStore = {
            username,
            password,
            age,
            firstname,
            lastname,
            email,
            phone,
            address,
        };

        console.log(UserStore);
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "UserName already taken !",
                });
            }

            const hashPassword = await argon2.hash(password);
            const userSave = new User({
                ...UserStore,
                password: hashPassword,
            });
            await userSave.save();
            return res.json({
                success: true,
                message: "User created successfully",
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }

    /// GET api/auth
    // Check user is logged in
    // Public
    async index(req, res) {
        try {
            const user = await User.findById(req.userId).select("-password");
            console.log("Index Check");
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: "User not found" });
            res.json({ success: true, user });
        } catch (error) {}
    }
}

module.exports = new AuthController();
