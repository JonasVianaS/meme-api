//imports
import { config } from "dotenv"; config()
import express,{Request, Response, NextFunction} from 'express';
import upload from 'express-fileupload';
import formats from "./utils/formats";
import tags from "./utils/tags";
import data from "./data/tables/data";
import session from 'express-session'
import { sequelize } from './data/database'
import cors from 'cors'
//data
const port:string = process.env.PORT || '3001'
const app = express()
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 2592000000
})

//middleware
app.use(express.static('assets'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(upload())
app.use(session({
    secret: process!.env!.SECRET!,
    resave:false,   
    saveUninitialized:true,
    cookie: {
        maxAge: 2592000000,
    },
    store: sessionStore
}))
app.use(cors({
    origin: [ process!.env!.ORIGIN!, 'http://localhost:3000' ],
}))

//local middleware functions

sessionStore.sync()




//paths


app.post('/upload', async(req:Request,res:Response)=>{
    if(!req.files) res.send('you must insert mediafiles').status(400)

    console.log()

    console.log(await data.findAll())
    console.log(req.files!.file)

    console.log(req.body)

})

//listen
app.listen(port,()=>{
    console.log('server started')
})