module.exports = function (sequelize, dataTypes) {
  let alias = "Product";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
    amount: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    discount: {
      type: dataTypes.INTEGER(11),
    },
    categoryId: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    seasonId: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
  };
  let config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  /* Associations */
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "categoryId",
    });
    Product.hasMany(models.Image, {
      as: "images",
      foreignKey: "productId",
    });
    Product.belongsToMany(models.Color, {
      as: "colors",
      through: "product_color",
      foreignKey: "productId",
      otherKey: "colorId",
    });
    Product.belongsTo(models.Season, {
      as: "season",
      foreignKey: "seasonId",
    });
    Product.belongsToMany(models.Size, {
      as: "sizes",
      through: "product_size",
      foreignKey: "productId",
      otherKey: "sizeId",
      timestamps: false,
    });
    Product.belongsToMany(models.User, {
      as: "users",
      through: "shoppingCart",
      foreignKey: "productId",
      otherKey: "userId"
    });
  };

  return Product;
};
