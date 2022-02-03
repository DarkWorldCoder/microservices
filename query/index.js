const express = require('express')
const cors = require('cors')
const axios = require('axios')
const  app = express()

app.use(cors())
app.use(express.json())
const posts = {}
app.get('/posts',(req,res)=>{
    res.send(posts)
})

const handleEvent = (type,data)=>{
  if(type==='PostCreated'){
    const {id,title } = data;
     
    posts[id] = {id,title,comments:[]}
    console.log(posts)
}

if(type==='CommentCreated'){
  const {id,content,postId,status} = data;

  const post = posts[postId];
  post.comments.push({id,content})

}
if(type==='CommentUpdated'){
  const {id,content,postId,status} = data;

  const post=posts[postId]

  const comment= post.comments.find(comment=>{
    return comment.id===id;
  })
  comment.status = status
  comment.content = content
}
}
app.post('/events',(req,res)=>{
const {type,data} = req.body 
handleEvent(type,data)
res.send({})
})


app.listen(5002,async()=>{
  console.log("Server running in port 6000")
  const res = await axios.get('http://event-bus-srv:9000/events')
  // for(let event of res.data){
  //   console.log("Processing event:", event.type)
  // }
})

