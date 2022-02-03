require('dotenv').config()
import {Sequelize} from 'sequelize'
const sequelize = new Sequelize('memes-api', 'postgres', process.env.SERVER_PASS,{
    host: 'localhost',
    dialect: 'postgres'
})
export {sequelize}