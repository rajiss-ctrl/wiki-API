const mongoose = require('mongoose');

// Define the article schema
const userSchema = new mongoose.Schema({
    uid: String,
    email: String,
    displayName: String,
    photoURL: String
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
