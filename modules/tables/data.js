const {Sequelize,sequelize} = require("../database")
const tags = require('../tags')

const data = sequelize.define('data',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    fileName:{
        allowNull: false,
        type: Sequelize.STRING(30)
    },
    mediaType:{
        allowNull:false,
        type: Sequelize.ENUM('img','vid')
    },
    language:{
        allowNull:false,
        type: Sequelize.ENUM('pt-br','en')
    },
    nsfw:{
        allowNull:false,
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    tags:{
        allowNull:true,
        defaultValue: null,
        type:Sequelize.ARRAY(Sequelize.STRING),
        validate:{
            isTag(value){
                value.map(v=>tags.filter((i)=>i===v)).map(item=>{
                    if(item.length === 0){
                        throw Error('Not a valid tag')
                    }
                })
            }
        }
    },
    extension:{
        allowNull:false,
        type:Sequelize.STRING(6)
    }
})

//data.sync({force:true})

module.exports = data