let { check, body } = require('express-validator')

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isAlpha()
        .withMessage('El nombre no puede contener numeros').bail()
        .isLength({ min: 4 })
        .withMessage('El nombre debe tener mas de 4 caracteres'),

    check('lastName')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isAlpha()
        .withMessage('El apellido no puede contener numeros').bail()
        .isLength({ min: 4 })
        .withMessage('El apellido debe tener mas de 4 caracteres'),

    check('phone')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isNumeric()
        .withMessage('El valor debe ser numerico').bail()
        .isLength({ min: 8 })
        .withMessage('El telefono debe tener mas de 8 numeros'),

    body('cv')
    .custom((value, { req }) => {
        return !/\.(pdf)$/.test(req.files[0].path) || req.files.length == 0 ? false : true
    }).withMessage("Archivo permitido (.pdf)"),

    check('email')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isEmail()
        .withMessage('Debes ingresar un email válido'),

    check('msg')
        .notEmpty()
        .withMessage('Campo obligatorio')
]