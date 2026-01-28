const express = require('express')
const multer = require('multer')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const router = express.Router()

const storage = multer.diskStorage({
  destination:'uploads',
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname)
  }
})

const upload = multer({storage})

router.post('/video',auth,admin,upload.single('video'),(req,res)=>{
  res.json({file:req.file})
})

router.post('/notes',auth,admin,upload.single('notes'),(req,res)=>{
  res.json({file:req.file})
})

module.exports = router
