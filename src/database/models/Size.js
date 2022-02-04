module.exports = (sequelize, dataTypes) =>{
    let alias = "Size";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }
    let config = {
        tableName: "sizes",
        timestamps: false
    }
    
    const Size = sequelize.define(alias, cols, config)
    Size.associate=models=>{
        Size.belongsToMany(models.Product,{
            as:"products",
            through:"product_size",
            foreignKey:"sizeId",
            otherKey:"productId",
            timestamps: false
        })
    }
    return Size
}