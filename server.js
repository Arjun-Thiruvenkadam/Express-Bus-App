const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const ticketRouter = require("./routes/tickets");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
require("dotenv").config();
require("./utils/connection")();

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRouter);
app.use("/auth", authRouter);
app.use("/users",userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "bus-app/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "bus-app", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
