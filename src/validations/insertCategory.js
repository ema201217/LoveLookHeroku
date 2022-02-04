let { check } = require('express-validator')

module.exports = [
    check('categoryInsert')
        .notEmpty()
        .withMessage('Ingrese una categoría').bail()
]