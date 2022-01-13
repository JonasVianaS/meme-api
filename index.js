const express = require('express')
const app = express()
const port = 5000

app.get('/',(req, res)=>{
    res.send('bababoi?')
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})