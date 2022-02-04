module.exports = (sequelize, dataTypes) => {
  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: dataTypes.INTEGER(50),
      allowNull: true,
    },
    email: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(60),
    },
    rolId: {
      type: dataTypes.INTEGER(11),
    },
    avatar: {
      type: dataTypes.STRING(150),
    },
    id_social:{
      type: dataTypes.INTEGER(11),
      
    },
    social_provider: {
      type: dataTypes.STRING(50),
     
      
    },
  };
  let User = sequelize.define("User", cols, {
    tableName: "users",
    timestamps: false,
  });
  User.associate = (models) => {
    User.belongsTo(models.Rol, {
      as: "rol",
      foreignKey: "rolId",
    });
    User.hasMany(models.Location, {
      as: "location",
      foreignKey: "userId",
    });
  
    User.belongsToMany(models.Product, {
        as: "products",
        through: "shoppingCart",
        foreignKey: "userId",
        otherKey: "productId"
    });
  };
  return User;
};
