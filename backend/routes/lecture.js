const express = require("express")
const Lecture = require("../models/Lecture")
const auth = require("../middleware/auth")

const router = express.Router()

// ADD lecture (admin)
router.post("/", auth, async(req,res)=>{
  const lecture = await Lecture.create(req.body)
  res.json(lecture)
})

// GET all lectures
router.get("/", async(req,res)=>{
  const lectures = await Lecture.find()
  res.json(lectures)
})

// GET by subject
router.get("/:subject", async(req,res)=>{
  const data = await Lecture.find({subject:req.params.subject})
  res.json(data)
})

module.exports = router
