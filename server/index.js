const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
require("./db/connections");

// Import Routes
const userRoutes = require("./routes/User");
const userChatRoutes = require("./routes/UserChats");
const groupRoutes = require("./routes/Groups");
const groupChatRoutes = require("./routes/GroupChats");
const channelRouts = require("./routes/Channel");
const channelchatRoute = require("./routes/ChannelChats");

// Use Routes
app.use("/api", userRoutes);
app.use("/api", userChatRoutes);
app.use("/api", groupRoutes);
app.use("/api", groupChatRoutes);
app.use("/api/channel", channelRouts);
app.use("/api/channelchats", channelchatRoute);

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to your API!");
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});
