module.exports = (sequelize, dataTypes) => {
    let alias = "Season";
    let cols = {
        id: {
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        name: {
            type:dataTypes.STRING(50),
            allowNull:false
        }

    }
    let config = {
        tableName:"seasons",
        timestamps: false
    }

    const Season = sequelize.define(alias, cols, config);
    Season.associate=models=>{
        Season.hasMany(models.Product,{
        as:"products",
        foreignKey:"seasonId"
        })
    }
    return Season;
}