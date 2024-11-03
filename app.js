const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const articleRoute = require('./routes/articleRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For JSON requests
app.use(cors());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_CONNECTION_STR}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Use article routes
app.use('/articles', articleRoute);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
   


// const articleSchema = new mongoose.Schema({
//     title: {
//        type: String,
//        required: [true, "Please check your entry "]
//    },
//     content:{ 
//        type:String,
//        required: [true, "Please check your entry "]
//    },  
//    })




//    const Article = mongoose.model("Article", articleSchema);
//    const article1 = new Article({
//     title:"First article to test",
//     content:"This the way to learn and later earn on drill"
//    })
//    const article2 = new Article({
//     title:"Second article to test",
//     content:"This the way to learn and later earn on drill"
//    })
//    const article3 = new Article({
//     title:"Third article to test",
//     content:"This the way to learn and later earn on drill"
//    })

//    async function insertArticle() {
//     try {
//         await Article.insertMany([article1, article2, article3]);
//         console.log("Inserted all document to the collection successfully!");
//     } catch (err) {
//         console.error(err);
//     }
// }
// insertArticle()


// ROUTE IN THE APP TO GET ALL ARTICLES

// app.get('/articles',async (req,res)=>{
//     async function findArticles() {
//         try {
//             const result = await Article.find();
//             console.log(result);
//             res.send(result)
//         } catch (err) {
//             console.error(err);
//             res.send(err)
//         }
//     }
//     findArticles()
// })

// ROUTE FROM [ROUTE FOLDER]



// app.post('/articles', async (req, res) => {
//     try {
//         const newArticle = new Article({
//             title: req.body.title,
//             content: req.body.content
//         });

//         const savedArticle = await newArticle.save();
//         res.send(savedArticle);  // Send saved article back if successful
//     } catch (err) {
//         console.error("Error saving article:", err);
//         res.status(500).send("There was an error saving the article.");
//     }
// });


// app.delete('/articles',async (req,res)=>{
//     async function deleteArticle() {
//         try {
//             const result = await Article.deleteOne({_id:"671e0af35f91b03f825528ed"});
            
//             res.send("Item successfully deleted")
//         } catch (err) {
//             console.error(err);
//             res.send(err)
//         }
//     }
//     deleteArticle()
// })




