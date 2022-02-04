let express = require('express');
let router = express.Router();
let {detail,list,category,sales} = require('../controllers/productsController.js');

router.get('/',list);
router.get('/:categoryId?',category);
router.get('/detail/:id/:categoryId',detail);
router.get('/products/Ofertas', sales)



module.exports = router