//import
require('dotenv').config()
import express from 'express'
const app = express()
const upload = require('express-fileupload')
const fs = require('fs')
const port:string = process.env.SERVER_PORT || '5000'
import formats from './modules/formats'
import data from './modules/tables/data'
import api from './modules/routes/api'

//config
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(upload())
app.use(express.static('assets'));
app.use('/api', api)

app.get('/',(req:any, res:any)=>{
    res.sendFile(__dirname+'/pages/home/index.html')
})

app.route('/add').get((req:any, res:any)=>{
    res.sendFile(__dirname+'/pages/post/index.html')
}).post(async (req:any,res:any)=>{
    if(!req.files) res.send('you must insert mediafiles')
    const fileName = req.files.file.name
    const file = req.files.file
    const lang = req.body.lang
    const x:string[] = fileName.split('.')
    const tags:string[] = req.body.tags.split(' ')
    const y = new Date()
    const extension:string = x[x.length-1].toString()
    const postFileName = `${y.getFullYear()}${y.getDate()}${y.getMonth()}${y.getHours()}${y.getMinutes()}${y.getSeconds()}${y.getMilliseconds()}.${extension}`
    //const ip =req.socket.remoteAddress
    
    // image add
    if(formats.image.filter((i:string)=>{return i===x[x.length-1]}).toString()){
        //console.log('image')
        try {
            //create data for database server
            await data.create({fileName:postFileName,mediaType:'img',language:lang,extension,tags})
            //move, rename and abort (if necessary) file upload
            file.mv('./assets/img/'+fileName, function(err:any){
                if(err){
                    //clean database if error
                    data.destroy({where:{ fileName:postFileName }})
                    .then(()=>res.send(err))
                }else{
                    //rename file
                    fs.rename(__dirname+'/assets/img/'+fileName,
                    `${__dirname}/assets/img/${postFileName}`,
                    function(err:any){
                        //remove archive and database data if error
                        if(err){
                            data.destroy({where:{ fileName:postFileName }})
                                .then(()=>fs.unlink(__dirname+'/assets/img/'+fileName||__dirname+'/assets/img/'+postFileName,
                                    (err:any)=>{if(err) throw Error(err)})
                                        .then(()=>{res.send(err)}))
                        }else{
                            //no errors
                            res.status(200).send('ok')
                        }
                    })
                }
            })
        }catch(err){
            res.send(err)
        }
    
    }
    // video add
    if(formats.video.filter((i:string)=>{return i===x[x.length-1]}).toString()){
        //console.log('video')
        //same from image
        try {
            await data.create({fileName:postFileName,mediaType:'vid',language:lang,extension,tags})
            file.mv('./assets/vid/'+fileName, function(err:any){
                if(err){
                    data.destroy({where:{ fileName:postFileName }})
                    .then(()=>res.send(err))
                }else{
                    fs.rename(__dirname+'/assets/vid/'+fileName,
                    `${__dirname}/assets/vid/${postFileName}`,
                    function(err:any){
                        if(err){
                            data.destroy({where:{ fileName:postFileName }})
                                .then(()=>fs.unlink(__dirname+'/assets/vid/'+fileName||__dirname+'/assets/vid/'+postFileName,
                                    (err:any)=>{if(err) throw Error(err)})
                                        .then(()=>{res.send(err)}))
                        }else{
                            //no errors
                            res.status(200).send('ok')
                        }
                    })
                }
            })
        }catch(err){
            res.send(err)
        }
    }
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})