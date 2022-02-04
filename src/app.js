const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config()

const localsCheck = require("./middleware/localsCheck");
const headerCategories = require("./middleware/headerCategories");

// 1
/////////////////////////////////////////
/* Passport */
const passport = require("passport");
/////////////////////////////////////////

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // lineas para trabajar con POST, -tiene que estar antes de las rutas
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: "loveLookModa",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(localsCheck);
app.use(headerCategories);

// 2
///////////////////////////////////
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////

// VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ENRUTADORES
let homeRouter = require("./routes/home");
let adminRouter = require("./routes/admin");
let infoRouter = require("./routes/info");
let productsRouter = require("./routes/products");
let userRouter = require("./routes/user");

// RUTAS
app.use("/", homeRouter);
app.use("/admin", adminRouter);
app.use("/info", infoRouter);
app.use("/products", productsRouter);
app.use("/user", userRouter);

// -------ERROR 404------------
app.use((req, res, next) => {
  const db = require("./database/models");
  db.Category.findAll().then((categorias) => {
    res.status(404).render("status404", {
      categorias,
      session: req.session,
      position: "position:relative",
    });
  });
});
// ----------------------------

/* SERVER*/
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
