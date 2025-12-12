const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// Format timestamps in responses
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    if (user.createdAt) {
        user.createdAt = user.createdAt.toLocaleString();
    }
    if (user.updatedAt) {
        user.updatedAt = user.updatedAt.toLocaleString();
    }
    return user;
};

module.exports = mongoose.model("User", userSchema);
