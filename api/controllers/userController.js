const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const router = express.Router()
const _ = require("lodash")

const User = require("../models/User");
const authenticateUser = require("../middlewares/authentication");

router.post("/register", (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => res.send(_.pick(user, ['_id', 'username', 'email', 'bio'])))
        .catch(err => res.send(err))
})

router.post("/login", (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(user => user.generateToken())
        .then(token => res.send({ token }))
        .catch(err => res.send(err))
})

router.get('/account', authenticateUser, function(req, res){
    const { user } = req
    res.send(_.pick(user, ['_id', 'username', 'email', 'bio', 'role']))
})

router.delete('/logout', authenticateUser, (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: {tokens: { token: token }}})
        .then(() => {
            res.send({notice: 'successfully logged out'})
        })
        .catch((err) => {
            res.send(err)
        })
})

// upload image routes
const upload = multer({ 
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a .jpg or .png image file'))
        }
        cb(undefined, true)
    }
})

router.post('/avatar', authenticateUser, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({notice: "avatar succefully uploaded.."})
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send({})
    }
})

router.delete('/avatar', authenticateUser, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send({notice: "avatar succefully deleted.."})
})

module.exports = router