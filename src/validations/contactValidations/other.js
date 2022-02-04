let { check } = require('express-validator')



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

        
    check('email')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isEmail()
        .withMessage('Debes ingresar un email válido'),

    check('msg')
        .notEmpty()
        .withMessage('Campo obligatorio')
]