const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

const uri = process.env.MONGO_URI
mongoose.connect(uri)
const connection = mongoose.connection
connection.once("open", () => {
  console.log("Connected to MongoDB")
})

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an awesome blog!')
})

// comments
const commentsController = require('./controllers/comment_controller.js')
app.use('/comments', commentsController)

// posts
const postsController = require('./controllers/post_controller.js')
app.use('/posts', postsController)

//404 - must be below main pages
app.get('*', (req, res) => {
  res.send('404')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

