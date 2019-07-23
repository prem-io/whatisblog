const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = require("../models/Blog");

const CommentSchema = new Schema({
    message: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment