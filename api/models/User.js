const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return "invalid email format"
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    bio: {
        type: String
    },
    avatar: {
        type: Buffer
    },
    tokens: [
        {
            token: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    role: {
        type: String,
        default: "user"
    }
})

// pre-hook --> before before you save the user in db, you need to encrypt user password.
userSchema.pre("save", function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(encryptedPassword => {
                        user.password = encryptedPassword
                        next()
                    })
            })
    } else {
        next()
    }
})

// static method --> findByCredentials to check if user provides the right email & password
userSchema.statics.findByCredentials = function(email, password) {
    const User = this
    return User.findOne({ email })
            .then(user => {
                if(!user) {
                    return Promise.reject("invalid email..")
                }

                return bcryptjs.compare(password, user.password)
                    .then(result => {
                        if(result) {
                            return Promise.resolve(user)
                        } else {
                            return Promise.reject("wrong password..")
                        }
                    })
            })
            .catch(err => Promise.reject("user not found"))
}

// instance method to generateToken
userSchema.methods.generateToken = function() {
    const user = this
    const tokenData = {
        _id: user._id,
        name: user.name,
        createdAt: Number(new Date())
    }

    const token = jwt.sign(tokenData, "jwt@123")
    user.tokens.push({token})

    return user.save()
        .then(user => Promise.resolve(token))
        .catch(err => Promise.reject(err))
}

// findByToken --> to authorize the user
userSchema.statics.findByToken = function(token) {
    const User = this
    try {
        tokenData = jwt.verify(token, "jwt@123")
    } catch(err) {
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        "tokens.token": token
    })
}

const User = mongoose.model("User", userSchema);

module.exports = User