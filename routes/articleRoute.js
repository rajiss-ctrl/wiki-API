const express = require('express');
const router = express.Router();
const { getArticles, postArticle,delArticle, updateArticle } = require('../controllers/articleController');

// Route for getting all articles
router.get('/', getArticles);

// Route for posting a new article
router.post('/', postArticle);

// Define route to delete an article by ID
router.delete('/:id', delArticle);


router.patch('/:id', updateArticle);
module.exports = router;
