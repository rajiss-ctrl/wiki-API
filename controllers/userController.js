const User = require('../models/Users');
const mongoose = require('mongoose');
// Get all users
const getUsers = async (req, res) => {
    try {
        const result = await User.find();
        console.log(result);
        res.send(result);
    } catch (err) {
        console.error("Error retrieving articles:", err);
        res.status(500).send("Error retrieving articles");
    }
};

// Get a single user by MongoDB ID or Firebase UID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if the id is a valid MongoDB ObjectId
        const isMongoId = mongoose.Types.ObjectId.isValid(id);
        const user = isMongoId 
            ? await User.findById(id)  // Retrieve by MongoDB ID
            : await User.findOne({ uid: id });  // Retrieve by Firebase UID

        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (err) {
        console.error("Error retrieving user:", err);
        res.status(500).send("Error retrieving user");
    }
};


// Save user to MongoDB



// Save user to backend and return saved user data
const registerUser = async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);  // Send saved user data including _id
    } catch (err) {
      console.error("Error saving user:", err);
      res.status(500).send("Error saving user");
    }
  };
  



// const registerUser = async (req, res) => {
//     const { uid, email, displayName, photoURL } = req.body;
//     try {
//       // Find if user exists, otherwise create new
//       let user = await User.findOne({ uid });
//       if (!user) {
//         user = new User({ uid, email, displayName, photoURL });
//       } else {
//         // Update existing user info
//         user.email = email;
//         user.displayName = displayName;
//         user.photoURL = photoURL;
//       }
//       await user.save();
//       res.status(200).json({ message: "User saved successfully" });
//     } catch (error) {
//       console.error("Error saving user:", error);
//       res.status(500).json({ error: "Failed to save user" });
//     }
// };

// Delete an article by ID
const removeUser = async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).send("User not found");
        } else {
            res.send("User successfully removed");
        }
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).send("Error deleting user");
    }
};

// Update an article by ID
// const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { title, content } = req.body;

//     try {
//         const updatedArticle = await Article.findByIdAndUpdate(
//             id, 
//             { title, content },
//             { new: true } // Option to return the updated document
//         );

//         if (!updatedArticle) {
//             return res.status(404).send("Article not found");
//         }

//         res.send(updatedArticle);
//     } catch (err) {
//         console.error("Error updating article:", err);
//         res.status(500).send("Error updating article");
//     }
// };

module.exports = {
    getUsers,
    getUserById,  
    registerUser,
    removeUser,
};
