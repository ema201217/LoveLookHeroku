module.exports = (sequelize, dataTypes) =>{
    let alias = "ProductSize";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        sizeId:{
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    let config = {
        tableName: "product_size",
        timestamps: false
    }
    
    const ProductSize = sequelize.define(alias, cols, config)
    return ProductSize
}