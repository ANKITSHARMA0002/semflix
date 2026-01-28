const express = require("express")
const OpenAI = require("openai")

const router = express.Router()

// Initialize OpenAI client if API key exists
let openai = null
if(process.env.OPENAI_KEY){
  openai = new OpenAI({apiKey:process.env.OPENAI_KEY})
}

router.post("/", async(req,res)=>{

  if(!openai){
    return res.json({reply:"AI tutor offline - no API key configured"})
  }

  const {question} = req.body

  try{
    const completion = await openai.chat.completions.create({
      model:"gpt-3.5-turbo",
      messages:[
        {role:"system",content:"You are SemFlix AI tutor for SRM exams. Answer student questions concisely."},
        {role:"user",content:question}
      ]
    })

    res.json({reply:completion.choices[0].message.content})
  }catch(e){
    res.json({reply:"AI error - " + e.message})
  }
})

module.exports = router
