const express = require("express")
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const events = []
app.post('/events',(req,res)=>{
   const event = req.body;
   events.push(event)
   axios.post('http://query-srv:5002/events',event)

   axios.post('http://comment-srv:5001/events',event)
   axios.post('http://post-srv:5000/events',event)
   axios.post('http://moderation-srv:5003/events',event)
   res.send({status:"Ok"})

})

app.get('/events',(req,res)=>{
   res.send(events)
})


app.listen(9000,console.log("Server running on 9000"))