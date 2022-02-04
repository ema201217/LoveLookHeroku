module.exports=(sequelize,dataTypes)=>{
    const cols= {
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        name:{
            type:dataTypes.STRING(50),
            allowNull: false
        }
    }
   let Rol = sequelize.define("Rol",cols,{
        tableName:"roles",
        timestamps:false
    })
    Rol.associate=models=>{
       Rol.hasMany(models.User,{
           as:"users",
           foreignKey:"rolId"
       })
    }
    return Rol
}