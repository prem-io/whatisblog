const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const router = express.Router()

const Blog = require("../models/Blog");
const authenticateUser = require("../middlewares/authentication");

const upload = multer({ 
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a .jpg or .png image file'))
        }
        cb(undefined, true)
    }
})

router.post("/", authenticateUser, upload.single('image'), async (req, res) => {
    const {user} = req
    const body = req.body
    
    const buffer = await sharp(req.file.buffer).resize({width: 600, height: 355 }).png().toBuffer()
    body.imageUrl = buffer

    const blog = new Blog(body)
    blog.user = user._id
    
    await blog.save()
        .then(blog => res.send(blog))
        .catch(err => res.send(err))
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Blog.findOne({_id: id}).populate('comments.comment')
        .then(blog => {
            if(!blog || !blog.imageUrl) {
                throw new Error()
            }
            res.set('Content-Type', 'image/png')
            res.send(blog)
        })
        .catch(err => res.status(404).send({}))
})

router.get("/", (req, res) => {
    Blog.find()
        .then(blogs => res.send(blogs))
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