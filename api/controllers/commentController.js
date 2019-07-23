const router = require("express").Router();

const Comment = require("../models/Comment");
const authenticateUser = require("../middlewares/authentication");

router.post("/", authenticateUser, (req, res) => {
    const {user} = req
    const body = req.body
    const comment = new Comment(body)
    comment.user = user._id
    comment.save()
        .then(comment => res.send(comment))
        .catch(err => res.send(err))
})

router.get("/:id", authenticateUser, (req, res) => {
    const blog = req.params.id
    Comment.find({blog}).populate("user")
        .then(comments => res.send(comments))
        .catch(err => res.send(err))
})

module.exports = router