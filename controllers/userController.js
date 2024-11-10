const User = require('../models/Users');

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

const getUserById = async (req, res) => {
    console.log("Requested user ID:", req.params.id);  // Log ID for debugging
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found:", user);  // Log found user for debugging
        res.json(user);
    } catch (err) {
        console.error("Error retrieving user:", err.message);
        res.status(500).json({ error: "Error retrieving user", details: err.message });
    }
};


// Save user to MongoDB
const registerUser = async (req, res) => {
    const { uid, email, displayName, photoURL } = req.body;
    try {
      // Find if user exists, otherwise create new
      let user = await User.findOne({ uid });
      if (!user) {
        user = new User({ uid, email, displayName, photoURL });
      } else {
        // Update existing user info
        user.email = email;
        user.displayName = displayName;
        user.photoURL = photoURL;
      }
      await user.save();
      res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ error: "Failed to save user" });
    }
};

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
