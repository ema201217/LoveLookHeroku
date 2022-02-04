let { check } = require('express-validator')

module.exports = [
    check('seasonInsert')
        .notEmpty()
        .withMessage('Ingrese una temporada').bail()
]