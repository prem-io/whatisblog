const router = require("express").Router()

const Blog = require("../models/Blog");
const authenticateUser = require("../middlewares/authentication");

router.get("/all", (req, res) => {
    Blog.find()
        .then(blogs => res.send(blogs))
        .catch(err => res.send(err))
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Blog.findOne({ _id: id }).populate('comments.comment')
        .then(blog => res.send(blog))
        .catch(err => res.send(err))
})

router.post("/", authenticateUser, (req, res) => {
    const {user} = req
    const body = req.body
    const blog = new Blog(body)
    blog.user = user._id
    blog.save()
        .then(blog => res.send(blog))
        .catch(err => res.send(err))
})

router.put("/:id", authenticateUser, (req, res) => {
    const {user} = req
    const id = req.params.id
    const body = req.body
    Blog.findOneAndUpdate({_id: id, user: user._id}, {$set: body}, {new: true, runValidators: true})
        .then(blog => {
            if(!blog){
                res.send({})
            }
            res.send(blog)
        })
        .catch(err => res.send(err))
})

router.delete("/:id", authenticateUser, (req, res) => {
    const {user} = req
    const id = req.params.id
    Blog.findOneAndDelete({_id: id, user: user._id})
        .then(blog => res.send({notice: `${blog.title} blog successfully deleted...`}))
        .catch(err => res.send(err))
})

module.exports = router;