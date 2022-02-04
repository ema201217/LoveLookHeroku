const { check, body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  check("firstName").notEmpty().withMessage("Debes ingresar un nombre"),

  check("lastName").notEmpty().withMessage("Debes ingresar un apellido"),

  check("email")
    .notEmpty()
    .withMessage("Debes ingresar un email")
    .bail("El campo email es obligatorio")
    .isEmail()
    .withMessage("Debes ingresar un email valido"),

  body("email").custom((value) => {
    return db.User.findOne({
      where: {
        email: value,
      },
    }).then((user) => {
      if (user) {
        return Promise.reject("Este mail ya está registrado");
      }
    });
  }),

  check("password")
    .notEmpty()
    .withMessage("El campo password es obligatorio")
    .isLength({
      min: 6,
      max: 10,
    })
    .withMessage(
      "La contraseña debe contener un minimo de 6 y maximo de 10 caracteres"
    ),

  body("pass2")
    .custom((value, { req }) => (value !== req.body.password ? false : true))
    .withMessage("Las contraseñas no coinciden"),

  check("condiciones")
    .isString("on")
    .withMessage("Debes aceptar los terminos y condiciones"),
];
