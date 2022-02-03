const express = require('express')
const app = express()
const axios  = require('axios')
// const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const posts = {}
const cors = require("cors")
app.use(express.json())
app.use(cors())
// app.use(bodyParser)
app.get('/posts',(req,res)=>{

    res.send(posts)
});

app.post('/posts/create',async(req,res)=>{
const id = randomBytes(4).toString('hex')
const {title} = req.body

posts[id] = {
    id,title
} 
await axios.post('http://event-bus-srv:9000/events',{
    type:"PostCreated",
    data:{
        id,title
    }
})
res.status(201).send(posts[id])

})

app.post('/events',(req,res)=>{
    console.log('recieved events',req.body.type)
    res.send({})
})
app.listen(5000,()=>{
    console.log('Listening on 4000')
})