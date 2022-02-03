import {DataTypes} from 'sequelize'
import { sequelize } from "../database"
import tags from '../tags'

const data = sequelize.define('data',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    fileName:{
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    mediaType:{
        allowNull:false,
        type: DataTypes.ENUM('img','vid')
    },
    language:{
        allowNull:false,
        type: DataTypes.ENUM('pt-br','en')
    },
    nsfw:{
        allowNull:false,
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    tags:{
        allowNull:true,
        defaultValue: null,
        type:DataTypes.ARRAY(DataTypes.STRING),
        validate:{
            isTag(value:string[]){
                value.map(v=>tags.filter((i:string)=>i===v)).map(item=>{
                    if(item.length === 0){
                        throw Error('Not a valid tag')
                    }
                })
            }
        }
    },
    extension:{
        allowNull:false,
        type:DataTypes.STRING(6)
    }
})

//data.sync({force:true})

export default data