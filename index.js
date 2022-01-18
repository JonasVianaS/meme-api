require('dotenv').config()
const express = require('express')
const app = express()
const upload = require('express-fileupload')
const fs = require('fs')
const port = process.env.SERVER_PORT || 5000
const formats = require('./modules/formats')
const data = require('./modules/tables/data')
//const md = require('markdown').markdown

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(upload())

app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/pages/home/index.html')
})

app.route('/add').get((req, res)=>{
    res.sendFile(__dirname+'/pages/post/index.html')
}).post(async (req,res)=>{
    if(!req.files) res.send('you must insert mediafiles')
    const fileName = req.files.file.name
    const file = req.files.file
    const lang = req.body.lang
    const x = fileName.split('.')
    const tags = req.body.tags.split(' ')
    const y = new Date()
    const extension = x[x.length-1].toString()
    const postFileName = `${y.getFullYear()}${y.getDate()}${y.getMonth()}${y.getHours()}${y.getMinutes()}${y.getSeconds()}${y.getMilliseconds()}.${extension}`
    //const ip =req.socket.remoteAddress
    
    // image add
    if(formats.image.filter((i)=>{return i===x[x.length-1]}).toString()){
        //console.log('image')
        try {
            //create data for database server
            await data.create({fileName:postFileName,mediaType:'img',language:lang,extension,tags})
            //move, rename and abort (if necessary) file upload
            file.mv('./assets/img/'+fileName,function(err){
                err?data.destroy({where:{ fileName:postFileName }}).then(()=>res.send(err)):
                fs.rename(__dirname+'/assets/img/'+fileName,
                `${__dirname}/assets/img/${postFileName}`,
                function(err){err?data.destroy({where:{ fileName:postFileName }}).then(()=>fs.unlink(__dirname+'/assets/img/'+fileName||__dirname+'/assets/img/'+postFileName,
                (err)=>{if(err) throw Error(err)}).then(()=>{res.send(err)}))
                :res.status(200).send('ok')})
            })
        }catch(err){
            res.send(err)
        }
    }
    // video add
    if(formats.video.filter((i)=>{return i===x[x.length-1]}).toString()){
        //console.log('video')
        //same from image
        try {
            await data.create({fileName:postFileName,mediaType:'vid',language:lang,extension,tags})
            file.mv('./assets/vid/'+fileName,function(err){
                err?data.destroy({where:{ fileName:postFileName }}).then(()=>res.send(err)):
                fs.rename(__dirname+'/assets/vid/'+fileName,
                `${__dirname}/assets/vid/${postFileName}`,
                function(err){err?data.destroy({where:{ fileName:postFileName }}).then(()=>fs.unlink(__dirname+'/assets/vid/'+fileName||__dirname+'/assets/vid/'+postFileName,
                (err)=>{if(err) throw Error(err)}).then(()=>{res.send(err)}))
                :res.status(200).send('ok')})
            })
        }catch(err){
            res.send(err)
        }
    }
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})