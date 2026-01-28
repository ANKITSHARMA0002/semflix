require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./auth");
const lectureRoutes = require("./lecture");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/lectures", lectureRoutes);

// TEST ROOT
app.get("/", (req, res) => {
  res.send("SemFlix Backend Running");
});

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server started on 5000");
});
