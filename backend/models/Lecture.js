const mongoose = require("mongoose")

const LectureSchema = new mongoose.Schema({
  title:String,
  subject:String,
  semester:String,
  video:String,
  notes:String
})

module.exports = mongoose.model("Lecture",LectureSchema)
