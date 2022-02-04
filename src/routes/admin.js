let express = require('express');
let router = express.Router();
let { listProductAdmin,
    addProductAdmin,
    editProduct,
    productStore,
    updateProduct,
    searchAdmin,
    destroy,
    insert,
    destroyValue,
    message,
    deleteMessage } = require('../controllers/adminController.js');
let { seeUser,
     deleteUser, 
     userChange, 
     adminUserChange } = require('../controllers/superUserController');
let multer = require('../middleware/uploadProductsFiles');
let productValidator = require('../validations/adminValidation.js');
let categoryInsert = require('../validations/insertCategory.js');
let colorInsert= require('../validations/insertColor.js');
let seasonInsert = require('../validations/insertSeason.js');
let uploadAdminCheck = require('../middleware/uploadAdminCheck');
let superUserCheck = require('../middleware/superUserCheck');

/* GET - View List Products */
router.get('/users', superUserCheck, seeUser);
router.get('/products', uploadAdminCheck , listProductAdmin);

/* GET - View Add Product  */
router.get('/products/add',  uploadAdminCheck, addProductAdmin);

/* POST - Creamos un producto con el método realizado en el controlador */
router.post('/products/add', uploadAdminCheck, multer.array('image', 4), productValidator, productStore);
router.post('/products/addCategory', uploadAdminCheck ,categoryInsert, insert.category);
router.post('/products/addColor', uploadAdminCheck, colorInsert, insert.color);
router.post('/products/addSeason', uploadAdminCheck, seasonInsert , insert.season);

/* Delete - borre un producto que coincida con el id de la ruta parametrizada */
router.delete('/products/productDelete/:id', uploadAdminCheck, destroy);
router.delete('/products/deleteCategory/:id', uploadAdminCheck, destroyValue.category);
router.delete('/products/deleteColor/:id', uploadAdminCheck, destroyValue.color);
router.delete('/products/deleteSeason/:id', uploadAdminCheck, destroyValue.season);
router.delete('/users/deleteUser/:id', superUserCheck, deleteUser);

/* GET - View Edit Product */
router.get('/products/edit/:id', uploadAdminCheck, editProduct);

/* PUT - Editamos un producto con el método realizado en el controlador */
router.put('/products/edit/:id', uploadAdminCheck, multer.array('image'), productValidator, updateProduct);
router.put('/users/userChange/:id', superUserCheck, userChange);
router.put('/users/adminUserChange/:id', superUserCheck, adminUserChange);


/* Bar search */
router.get('/products/search', uploadAdminCheck, searchAdmin)


router.get('/messages',uploadAdminCheck, message);
router.delete('/messages/delete/:id', uploadAdminCheck, deleteMessage);

module.exports = router