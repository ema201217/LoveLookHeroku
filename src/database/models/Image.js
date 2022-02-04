module.exports = (sequelize, dataTypes) => {
    let alias = "Image";
    let cols = {
        id: {
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        filename: {
            type:dataTypes.STRING(100),
            allowNull:false,
            defaultValue:"default.png"
        },
        productId:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        }

    }
    let config = {
        tableName:"images",
        timestamps:false
    }

    const Image = sequelize.define(alias, cols, config);
    Image.associate=models=>{
        Image.belongsTo(models.Product,{
            as:"product",
            foreignKey:"productId"
        })
    }
    return Image;
} 