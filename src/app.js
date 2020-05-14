const express = require("express");
const userRouter = require("./routers/user-routes");
const taskRouter = require("./routers/task-routes");
require("./db/mongoose");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
