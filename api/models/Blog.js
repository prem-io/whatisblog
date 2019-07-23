const mongoose = require("mongoose");

const Schema = mongoose.Schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    }]
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog