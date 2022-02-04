module.exports = (sequelize, dataTypes) => {
    let alias = "Location";
    let cols = {
        id: {
            type:dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        province: {
            type:dataTypes.STRING(50)
        },
        city: {
            type:dataTypes.STRING(50)
        },
        pc: {
            type:dataTypes.INTEGER(11) 
        },
        address:{
            type:dataTypes.STRING(50)
        },
        userId:{
            type:dataTypes.INTEGER(11)  
        }

    }
    let config = {
        tableName:"locations",
        timestamps:false
    }

    const Location = sequelize.define(alias, cols, config)
    Location.associate= function(models){
        Location.belongsTo(models.User,{
            as:"user",
            foreignKey:"userId"
        })
    }
    return Location;
}