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

app.post("/api/register&login", async (req, res) => {
  try {
    const { mobile } = req.body;
    const mobileRegex = /^\d{10}$/;

    if (!mobile || !mobileRegex.test(mobile)) {
      return res.status(400).json({ error: "Invalid mobile number" });
    } else {
      const isAlreadyExist = await Users.findOne({ mobile });
      if (isAlreadyExist) {
        return res.status(400).send("User already exists");
      } else {
        const token = jwt.sign({ mobile }, "your_secret_key");

        const newUser = new Users({ mobile, token });
        await newUser.save();

        return res
          .status(200)
          .send({ message: "Mobile number registered successfully", token });
      }
    }
  } catch (error) {
    console.log(error, "Error");
    return res.status(500).json({ error: "Internal server error" });
  }
});
