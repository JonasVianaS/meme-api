const express = require('express')
const app = express()
const upload = require('express-fileupload')
const port = 5000
const formats = require('./modules/formats')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(upload())

app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/pages/home/index.html')
})

app.get('/addmanager',(req, res)=>{
    res.sendFile(__dirname+'/pages/post/index.html')
})

app.post('/add',(req,res)=>{
    const fileName = req.files.file.name
    const file = req.files.file
    const x = fileName.split('.')
    // image add
    if(formats.image.filter((i)=>((i === x[x.length-1]).toString())())){
        console.log('image')
        file.mv('./assets/images/'+fileName,function(err){
            err?res.send(err):res.send("image uploaded")
        })
    }
    // video add
    if(formats.video.filter((i)=>((i === x[x.length-1]).toString())())){
        console.log('video')
        file.mv('./assets/videos/'+fileName,function(err){
            err?res.send(err):res.send("video uploaded")
        })
    }
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})