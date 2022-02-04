let express = require('express');
let router = express.Router();
let {index,afip,search} = require('../controllers/homeController.js');
let cookieCheck = require('../middleware/cookieCheck')

router.get('/', cookieCheck, index);
router.get('/afip',afip);
router.get('/search',search);

module.exports = router