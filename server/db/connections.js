const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://amitmandalbetai:BQmAlYZHtiZbzMVW@whatsapp0.kpbdyvh.mongodb.net/?retryWrites=true&w=majority&appName=WhatsApp0"
  )
  .then(() => console.log("Connect db"))
  .catch((e) => console.log("Error", e));
