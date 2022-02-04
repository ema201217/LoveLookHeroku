module.exports = function (sequelize, dataTypes) {
    let alias = "Color";
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
        tableName: "colors",
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config)

    Color.associate = models => {
        Color.belongsToMany(models.Product, {
            as: "products",
            through: "product_color",
            foreignKey: "colorId",
            otherKey: "productId",
            timestamps:false
        })
    }
    return Color
} 