const db = require('../database/models')
const { check, body } = require('express-validator');

module.exports = [
    check('firstName')
    .notEmpty()
    .isAlpha()
    .withMessage('Debes ingresar un nombre'),

    check('lastName')
    .notEmpty()
    .isAlpha()
    .withMessage('Debes ingresar un apellido'),

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
            return Promise.reject("Este mail ya está en uso");
          }
        });
      }),

    check('phone')
    .isNumeric()
    .isMobilePhone()
    .notEmpty()
    .withMessage('Debes ingresar un telefono'),

    check('address')
    .notEmpty()
    .isAlphanumeric()
    .isLength({
        min: 4
    })
    .withMessage('Debes ingresar una dirección'),

    check('pc')
    .isNumeric()
    .isPostalCode()
    .withMessage('Debes ingresar un codigo postal'),

]