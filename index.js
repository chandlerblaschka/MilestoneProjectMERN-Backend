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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

