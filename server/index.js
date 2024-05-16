const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
// use appp
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// connect DB
require("./db/connections");

const port = process.env.PORT || 4000;
// .....................
app.get("/", (req, res) => {
  res.end("Welcome Database in WhatsApp clone");
});
// .............................
app.listen(port, () => {
  console.log("listing on port" + port);
});
// import files
const Users = require("./modules/Users");
const Chat = require("./modules/Chat")

// register....................
app.post("/api/register/login", async (req, res) => {
  try {
    const { mobile } = req.body;
    const mobileRegex = /^\d{10}$/;

    if (!mobile || !mobileRegex.test(mobile)) {
      return res.status(400).json({ error: "Invalid mobile number" });
    }

    let existingUser = await Users.findOne({ mobile });
    let token;

    if (!existingUser) {
      // If the user doesn't exist, create a new user and generate a token
      token = jwt.sign({ mobile }, "your_secret_key");

      const newUser = new Users({ mobile, token });
      await newUser.save();

      return res.status(200).send({
        message: "Mobile number registered successfully",
        token,
        user: { id: newUser._id, mobile: newUser.mobile },
      });
    } else {
      // If the user exists, generate a token for login
      token = jwt.sign({ mobile }, "your_secret_key");

      return res.status(200).send({
        message: "Login successful",
        token,
        user: { id: existingUser._id, mobile: existingUser.mobile },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// userProfile PoST..................
app.post("/api/profile", async (req, res) => {
  try {
    const { userimage, id, username } = req.body;
    if (!userimage || !id || !username) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const existingProfile = await Users.findOne({ _id: id });
    if (existingProfile) {
      existingProfile.userimage = userimage;
      existingProfile.username = username;
      await existingProfile.save();
      return res
        .status(200)
        .json({ message: "User details updated successfully" });
    } else {
      const newUser = new Users({ userimage, username });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User details registered successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

// userProfile GET Request.......
app.get("/api/userdetails/:_id", async (req, res) => {
  try {
    const _id = req.params._id;

    const userDetails = await Users.findById(_id);

    if (userDetails) {
      res.status(200).json(userDetails);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

// userName PoST..................
app.post("/api/nameuser", async (req, res) => {
  try {
    const { id, username } = req.body;
    if (!id || !username) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const existingnameuser = await Users.findOne({ _id: id });
    if (existingnameuser) {
      existingnameuser.username = username;
      await existingnameuser.save();
      return res
        .status(200)
        .json({ message: "User name updated successfully" });
    } else {
      const newName = new Users({ username });
      await newName.save();
      return res
        .status(201)
        .json({ message: "User name registered successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

// userAbout PoST..................
app.post("/api/aboutuser", async (req, res) => {
  try {
    const { id, userabout } = req.body;
    if (!id || !userabout) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const existingabout = await Users.findOne({ _id: id });
    if (existingabout) {
      existingabout.userabout = userabout;
      await existingabout.save();
      return res
        .status(200)
        .json({ message: "User about updated successfully" });
    } else {
      const newAbout = new Users({ userabout });
      await newAbout.save();
      return res
        .status(201)
        .json({ message: "User about registered successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});
// User Show all.........................
app.get("/api/users/all/:loginUserID", async (req, res) => {
  try {
    const loginUserID = req.params.loginUserID;

    const allUsers = await Users.find();

    const otherUsers = allUsers.filter(
      (user) => user._id.toString() !== loginUserID
    );

    res.json(otherUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// User DELETE...........................

// app.delete("/api/deleteProfilePhoto/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "Please provide a user ID" });
//     }

//     const existingUser = await Users.findOne({ _id: id });

//     if (!existingUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     await Users.deleteOne({ userimage: userimage });

//     return res.status(200).json({ message: "Photo deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error!" });
//   }
// });

// userTheme PoST..................
app.post("/api/themeuser", async (req, res) => {
  try {
    const { id, usertheme, userthemelabel } = req.body;
    if (!id || !usertheme || !userthemelabel) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const existingthemeuser = await Users.findOne({ _id: id });
    if (existingthemeuser) {
      existingthemeuser.usertheme = usertheme;
      existingthemeuser.userthemelabel = userthemelabel;
      await existingthemeuser.save();
      return res
        .status(200)
        .json({ message: "User theme updated successfully" });
    } else {
      const newtheme = new Users({ usertheme, userthemelabel });
      await newtheme.save();
      return res
        .status(201)
        .json({ message: "User theme registered successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});
// Profile images delete only......................................
app.delete("/api/deleteProfilePhoto/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Please provide a user ID" });
    }
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { $unset: { userimage: "" } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Photo deleted successfully", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});
// Chats Api call......................
// Routes
app.get('/api/get/chats', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/post/chats', async (req, res) => {
  const chat = new Chat({
    sender: req.body.sender,
    receiver: req.body.receiver,
    message: req.body.message
  });
  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});