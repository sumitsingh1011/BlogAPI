const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPass });
         

        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
