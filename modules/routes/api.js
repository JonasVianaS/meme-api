const express = require('express')
const { Op } = require("sequelize");
const router = express.Router()
const data = require('../../modules/tables/data')

const randomize= function(arr){
    if(!Array.isArray(arr))throw Error('only Array values are valid')
    if(arr.length <= 0) throw Error('Array must have at least 1 item')
    min = Math.ceil(0);
    max = Math.floor(arr.length/*-1*/);
    //!max===-1||max++
    //console.log(arr.length)
    return arr[Math.floor(Math.random() * (max - min)) + min]
}

router.get('/', (req,res)=>{
    res.json({hello:'world :D'})
})
router.get('/id/:id',async (req,res)=>{
    const prom = await data.findAll({where:{
        id:req.params.id
    }})
    res.json({media: `http://${req.headers.host}/${prom[0].mediaType}/${prom[0].fileName}`, response:prom})
})
router.get('/tag/:tag',async (req,res)=>{
    const prom = await data.findAll({where:{
        tags:{
            [Op.contains]: [req.params.tag]
        },
        
    }})
    const x = randomize(prom)
    res.json({media: `http://${req.headers.host}/${x.mediaType}/${x.fileName}`, response:x})
})

module.exports=router