module.exports = function (sequelize, dataTypes) {
  let alias = "Cart";
  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    productId: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    totalPrice: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    count: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
  };
  let config = {
    tableName: "shoppingCart"
  };

  const Cart = sequelize.define(alias, cols, config);
  return Cart;
};
