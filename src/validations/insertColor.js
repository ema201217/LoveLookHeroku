let { check } = require('express-validator')

module.exports = [
    check('colorInsert')
        .notEmpty()
        .withMessage('Ingrese una color').bail()
]