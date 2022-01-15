require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('memes-api', 'postgres', process.env.SERVER_PASS,{
    host: 'localhost',
    dialect: 'postgres'
})
module.exports={Sequelize, sequelize}