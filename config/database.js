const mongoose = require("mongoose")

const URI = "mongodb://localhost:27017/what-is-blog"

mongoose.Promise = global.Promise

mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)

mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => { console.log("db connected...")})
    .catch(err => { console.log("error connecting db...")})

module.exports = mongoose