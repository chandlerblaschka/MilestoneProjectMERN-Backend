export {}

const mongoose = require("mongoose")

let commentSchema = new mongoose.Schema({
    comment_author: { type: String, default: "Anonymous" },
    comment_date: { type: Date, required: true },
    comment_content: { type: String, required: true },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
})

module.exports = mongoose.model("Comment", commentSchema)