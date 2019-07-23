const router = require("express").Router();
const _ = require("lodash")

const User = require("../models/User");
const authenticateUser = require("../middlewares/authentication");

router.get('/account', authenticateUser, function(req, res){
    const { user } = req
    res.send(_.pick(user, ['_id', 'name', 'email', 'bio', 'role']))
})

router.post("/register", (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => res.send(_.pick(user, ['_id', 'name', 'email', 'bio'])))
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
    res.send(_.pick(user, ['_id', 'name', 'email', 'bio', 'role']))
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

module.exports = router