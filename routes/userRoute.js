const express = require('express');
const { getUsers, getUserById, registerUser, removeUser } = require('../controllers/userController');
const router = express.Router();


// Route for getting all users
router.get('/', getUsers);

// Route for getting single user
router.get('/:id', getUserById);

// Route for registering a new user
router.post('/', registerUser);

// Define route to delete an article by ID
router.delete('/:id', removeUser);


// router.patch('/:id', updateArticle);
module.exports = router;
