const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://mongo:27017/testdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const User = mongoose.model("User", { name: String });

// Routes
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

app.listen(5000, () => console.log("Server running on port 5000"));