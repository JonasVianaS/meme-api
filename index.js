const express = require('express')
const app = express()
require('dotenv').config()
const port = 5000


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/pages/home/index.html')
})

app.post('/hehe',(req,res)=>{
    res.send(process.env.um)
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})