const mongoose = require('mongoose');

// Define the article schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check your entry"]
    },
    content: { 
        type: String,
        required: [true, "Please check your entry"]
    }
});

// Create and export the Article model
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
