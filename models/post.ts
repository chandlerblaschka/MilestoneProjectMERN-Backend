export { }

const mongoose = require("mongoose")
const Comment = require("./comment")

const postSchema = new mongoose.Schema({
    post_author: { type: String, required: true },
    post_title: { type: String, required: true },
    post_date: { type: Date, required: true },
    post_content: { type: String, required: true }
}, { toJSON: { virtuals: true } })

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post"
})

postSchema.post("findOneAndDelete", function () {
    Comment.deleteMany({ post: this._conditions._id })
        .then((deleteStatus: string) => {
            console.log("Delete Status: " + deleteStatus)
        })
})

module.exports = mongoose.model("Post", postSchema)