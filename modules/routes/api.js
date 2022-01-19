const express = require('express')
const router = express.Router()
const data = require('../../modules/tables/data')

router.get('/',  (req,res)=>{
    
})
router.get('/id/:id',async (req,res)=>{
    const prom = await data.findAll({where:{
        id:req.params.id
    }})
    res.json({media: `http://${req.headers.host}/${prom[0].mediaType}/${prom[0].fileName}`, response:prom})
})
router.get('/tags?',(req,res)=>{
    console.log(req)
})

module.exports=router