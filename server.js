const express = require("express");
const mongoose = require("./config/database");
const cors = require('cors');

const userRouter = require("./api/controllers/userController");
const blogRouter = require("./api/controllers/blogController");
const commentRouter = require("./api/controllers/commentController");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => {
    console.log(`server at port ${PORT}`)
})