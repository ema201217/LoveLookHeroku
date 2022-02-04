const db = require("../database/models");
const {Op} = require('sequelize')
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  list: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "category" },
        { association: "images" },
        { association: "colors" },
        { association: "season" },
        { association: "sizes" },
      ],
    }).then((products) => {

      let prices = new Set() /* Un elemento Set almacena valores unicos, en este caso lo coloque para que los precios no se repitan */
      products.forEach(product => {
          prices.add(product.price)
      })
      prices = Array.from(prices) /* convierto el elemento tipo de dato Set en un Array (from) */
      prices.sort((a, b) => a - b)
      
      db.Color.findAll().then((colors) => {
        db.Size.findAll().then((sizes) => {
          res.render("products/listProducts", {
            products,
            colors,
            sizes,
            position: "",
            toThousand,
            prices,
            display: "display:grid;",
            session: req.session,
          });
        });
      });
    });
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "category" },
        { association: "images" },
        { association: "colors" },
        { association: "season" },
        { association: "sizes" },
      ],
    })
      .then((product) => {
        db.Product.findAll({
          where: {
            categoryId: req.params.categoryId,
          },
          limit: 5,

          include: [
            { association: "category" },
            { association: "images" },
            { association: "colors" },
            { association: "season" },
            { association: "sizes" },
          ],
        }).then((products) => {
          console.log(products);
          res.render("products/productDetail", {
            product,
            products,
            titleSlider: "Productos Relacionados",
            position: "",
            toThousand,
            session: req.session,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  category: (req, res) => {
    db.Product.findAll({
      where: {
        categoryId: req.params.categoryId,
      },
      include: [
        { association: "category" },
        { association: "images" },
        { association: "colors" },
        { association: "season" },
        { association: "sizes" },
      ],
    }).then((products) => {

      
    
      let prices = new Set() /* Un elemento Set almacena valores unicos, en este caso lo coloque para que los precios no se repitan */
      products.forEach(product => {
          prices.add(product.price)
      })
      prices = Array.from(prices) /* convierto el elemento tipo de dato Set en un Array (from) */
      prices.sort((a, b) => a - b)
  

      db.Color.findAll().then((colors) => {
        db.Size.findAll().then((sizes) => {
          res.render("products/listProducts", {
            display: "display:grid;",
            position: "",
            colors,
            toThousand,
            sizes,
            products,
            prices,
            session: req.session,
          });
        });
      });
    });
  },
  sales:(req, res) => {
    db.Product.findAll({
      where:{
        discount:{
          [Op.gte]: 30,
        }
      },
      include: [
        { association: "category" },
        { association: "images" },
        { association: "colors" },
        { association: "season" },
        { association: "sizes" },
      ],
    }).then((products) => {

      let prices = new Set() /* Un elemento Set almacena valores unicos, en este caso lo coloque para que los precios no se repitan */
      products.forEach(product => {
          prices.add(product.price)
      })
      prices = Array.from(prices) /* convierto el elemento tipo de dato Set en un Array (from) */
      prices.sort((a, b) => a - b)
      
      db.Color.findAll().then((colors) => {
        db.Size.findAll().then((sizes) => {
          res.render("products/listProducts", {
            products,
            colors,
            sizes,
            position: "",
            toThousand,
            prices,
            display: "display:grid;",
            session: req.session,
          });
        });
      });
    });
  }
};
