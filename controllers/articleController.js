const Article = require('../models/Articles');

// Get all articles
const getArticles = async (req, res) => {
    try {
        const result = await Article.find();
        console.log(result);
        res.send(result);
    } catch (err) {
        console.error("Error retrieving articles:", err);
        res.status(500).send("Error retrieving articles");
    }
};

// Post a new article
const postArticle = async (req, res) => {
    try {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        const savedArticle = await newArticle.save();
        res.send(savedArticle);  // Send saved article back if successful
    } catch (err) {
        console.error("Error saving article:", err);
        res.status(500).send("There was an error saving the article.");
    }
};

// Delete an article by ID
const delArticle = async (req, res) => {
    try {
        const result = await Article.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).send("Article not found");
        } else {
            res.send("Item successfully deleted");
        }
    } catch (err) {
        console.error("Error deleting article:", err);
        res.status(500).send("Error deleting article");
    }
};

// update
const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            id, 
            { title, content },
            { new: true } // Option to return the updated document
        );

        if (!updatedArticle) {
            return res.status(404).send("Article not found");
        }

        res.send(updatedArticle);
    } catch (err) {
        console.error("Error updating article:", err);
        res.status(500).send("Error updating article");
    }
};


module.exports = {
    getArticles,
    postArticle,
    delArticle,
    updateArticle
};
