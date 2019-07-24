const mongoose = require("mongoose");

const Schema = mongoose.Schema
const blogSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: Buffer
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
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