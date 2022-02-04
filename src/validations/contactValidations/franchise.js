let { check,body } = require('express-validator')



module.exports = [
    check('name')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isAlpha()
        .withMessage('El nombre no puede contener numeros ni caracteres especiales').bail()
        .isLength({ min: 4 })
        .withMessage('El nombre debe tener mas de 4 caracteres'),

    check('lastName')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isAlpha()
        .withMessage('El apellido no puede contener numeros').bail()
        .isLength({ min: 4 })
        .withMessage('El apellido debe tener mas de 4 caracteres'),

    check('dni')
        .notEmpty()
        .withMessage('Campo obligatorio')
        .isLength({ min: 7, max: 8 })
        .withMessage('El valor ingresado no es un dni'),

    check('phone')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isNumeric()
        .withMessage('El valor debe ser numerico').bail()
        .isLength({ min: 8 })
        .withMessage('El telefono debe tener mas de 8 numeros'),

    check('email')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .isEmail()
        .withMessage('Debes ingresar un email válido'),

    check('location')
        .notEmpty()
        .withMessage('Seleccione una localidad'),

    body('address')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .custom((value,{req})=>{
           return !/^[a-zA-Z\sñáéíóúü]+\s+[0-9]{2,5}$/.test(req.body.address)?false:true
        })
        .withMessage('Ingrese una dirección y su altura').bail()
        .isLength({ min: 5 })
        .withMessage('El domicilio debe tener mas de 5 caracteres'),

    check('province')
        .notEmpty()
        .withMessage('Selección obligatoria').bail(),

    body('cuit')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .custom((value,{req})=>{
            return !/\b(20|23|24|27|30|33|34)(\D)?[0-9]{7,8}(\D)?[0-9]/.test(req.body.cuit)?false:true
        })
        .withMessage("El cuit ingresado es invalido"),

    body('businessName')
        .notEmpty()
        .withMessage('Campo obligatorio').bail()
        .custom((value,{req})=>{
            return !/^[a-z0-9A-Z\sñáéíóúü]*$/.test(req.body.businessName)?false:true
        })
        .withMessage('No se permiten caracteres especiales'),

    check('socialLocation')
        .notEmpty()
        .withMessage('Campo obligatorio').bail(),

    check('msg')
        .notEmpty()
        .withMessage('Campo obligatorio'),
]