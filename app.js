const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo_list", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the app if the connection fails
  }
}

connectToDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));

// Server configurations
app.listen(3000, () => console.log("Server started listening on port: 3000"));
