const express = require('express')
const app = express()
const upload = require('express-fileupload')
const fs = require('fs')
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
    const y = new Date()
    const extension = x[x.length-1].toString()
    const postFileName = `${y.getFullYear()}${y.getDate()}${y.getMonth()}${y.getHours()}${y.getMinutes()}${y.getSeconds()}${y.getMilliseconds()}.${extension}`
    
    // image add
    if(formats.image.filter((i)=>{return i === x[x.length-1]}).toString()){
        //console.log('image')
        file.mv('./assets/images/'+fileName,function(err){
            err?res.send(err):
            fs.rename(__dirname+'/assets/images/'+fileName,
            `${__dirname}/assets/images/${postFileName}`,
            function(err){err?res.send(err):console.log('renamed')})
        })
    }
    // video add
    if(formats.video.filter((i)=>{return i === x[x.length-1]}).toString()){
        //console.log('video')
        file.mv('./assets/videos/'+fileName,function(err){
            err?res.send(err):
            fs.rename(__dirname+'/assets/videos/'+fileName,
            `${__dirname}/assets/videos/${postFileName}`,
            function(err){err?res.send(err):console.log('renamed')})
        })
    }
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})