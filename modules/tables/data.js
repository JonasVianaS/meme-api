const {Sequelize,sequelize} = require("../database")

const data = sequelize.define('data',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },
})

//data.sync({force:true})

module.exports = data