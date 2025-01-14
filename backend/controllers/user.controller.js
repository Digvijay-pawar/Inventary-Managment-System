const { createToken, findUserByEmail, findUserById, comparePassword, hashPassword } = require('../services/user.service');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ status: false, message: "Incomplete information" });
        }

        const user = await findUserByEmail(email);
        if (user) {
            return res.status(409).json({ status: false, message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = await createToken(newUser._id);

        return res.status(201).json({
            status: true,
            message: "User created successfully!",
            token

        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Incomplete information" });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ status: false, message: "Invalid credentials" });
        }

        const token = await createToken(user._id);

        return res.status(200).json({
            status: true,
            message: "User logged in successfully!",
            token

        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const id = req.id;
        if (!id) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        return res.status(200).json({
            status: true,
            message: "User data fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};