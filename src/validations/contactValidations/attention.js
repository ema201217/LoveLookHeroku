let { check } = require('express-validator')



module.exports = [
    check('name')
        .notEmpty()
        .withMessage('Ingrese un nombre').bail()
        .isAlpha()
        .withMessage('El nombre no puede contener numeros').bail()
        .isLength({ min: 4 })
        .withMessage('El nombre debe ser mayor a 4 caracteres'),

    check('lastName')
        .notEmpty()
        .withMessage('Ingrese un apellido').bail()
        .isAlpha()
        .withMessage('El apellido no puede contener numeros').bail()
        .isLength({ min: 4 })
        .withMessage('El apellido debe tener minimo 4 caracteres'),

    check('phone')
        .isNumeric()
        .withMessage('El valor debe ser numerico'),

    check('email')
        .notEmpty()
        .withMessage('Debes ingresar un email').bail()
        .isEmail()
        .withMessage('Debes ingresar un email válido'),

    check('msg')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio'),
]