const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const bodyParser = require("body-parser");
// use appp
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// connect DB
require("./db/connections");

// Import Routes...................
const userRoutes = require("./routes/User");
const userChatRoutes = require("./routes/UserChats");
const groupRoutes = require("./routes/Groups");
const groupChatRoutes = require("./routes/GroupChats");

// Use Routes..........
app.use("/api", userRoutes);
app.use("/api", userChatRoutes);
app.use("/api", groupRoutes);
app.use("/api", groupChatRoutes);

const port = process.env.PORT || 4000;
// .....................
app.get("/", (req, res) => {
  res.end("Welcome Database in WhatsApp clone");
});
// .............................
app.listen(port, () => {
  console.log("listing on port" + port);
});
