const express = require("express");
const userRouter = require("./routers/user-routes");
const taskRouter = require("./routers/task-routes");
require("./db/mongoose");

const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//   res
//     .status(503)
//     .send("The site is currently in mainainance. Please come again later.");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
