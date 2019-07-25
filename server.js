const express = require("express");
const mongoose = require("./config/database");
const cors = require('cors');

const userRouter = require("./api/controllers/userController");
const blogRouter = require("./api/controllers/blogController");
const commentRouter = require("./api/controllers/commentController");

const app = express();
const path = require("path")
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,"client/build")))

app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(port, () => {
    console.log(`server at port ${port}`)
})