import { config } from "dotenv"; config()
import express, {Request, Response} from 'express';
import upload from 'express-fileupload';
import cors from 'cors'
import formats from "./utils/formats";
import tags from "./utils/tags";
import data from "./data/tables/data";
const port:string = process.env.PORT || '3001'
const app = express()
//const sqlite3 = require('sqlite3').verbose()


// imports
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(upload())
app.use(cors({
    origin:'http://localhost:3000',
}))
app.use(express.static('assets'));


// paths
app.get('/inpt',async (req:Request,res:Response)=>{
    const lang = await data.getAttributes().language.values
    
    res.send({lang,formats,tags})
})

app.route('/upload').post(async(req:Request,res:Response)=>{
    if(!req.files) res.send('you must insert mediafiles').status(400)

    console.log(await data.findAll())

    console.log(req.body)
    res.send('ja toia').status(200)
})

app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port}`)
})