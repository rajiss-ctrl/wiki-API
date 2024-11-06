const express = require('express');
const router = express.Router();
const { getArticles, postArticle,delArticle, updateArticle, getSingleArticle, getArticleById } = require('../controllers/articleController');

// Route for getting all articles
router.get('/', getArticles);

// Route for getting single articles
router.get('/:id', getArticleById);

// Route for posting a new article
router.post('/', postArticle);

// Define route to delete an article by ID
router.delete('/:id', delArticle);


router.patch('/:id', updateArticle);
module.exports = router;
