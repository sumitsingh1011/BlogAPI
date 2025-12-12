const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.testDB);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
