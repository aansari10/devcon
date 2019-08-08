const express = require("express");
const mongoose = require("mongoose");
const app = express();
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const passport = require("passport");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MOngoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log("Errorrrr", err));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
