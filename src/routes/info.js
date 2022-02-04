let express = require('express');
let router = express.Router();
let {contactOther,
    contactAttention,
    contactFranchise,
    contactRRHH,
    help,
    we,
    sendContactOther,
    sendContactAttention,
    sendContactRRHH,
    sendContactFranchise} = require('../controllers/infoController.js');

let uploadContactCV = require('../middleware/uploadContactCV')
let contactFranchiseV = require('../validations/contactValidations/franchise')
let contactOtherV = require('../validations/contactValidations/other')
let contactRRHHV = require('../validations/contactValidations/rrhh')
let contactAttentionV = require('../validations/contactValidations/attention')

router.get('/contact/other',contactOther);
router.get('/contact/rrhh',contactRRHH);
router.get('/contact/franchise',contactFranchise);
router.get('/contact/attention',contactAttention);

router.post('/contact/other',contactOtherV,sendContactOther);
router.post('/contact/rrhh',uploadContactCV.array("cv"),contactRRHHV,sendContactRRHH);
router.post('/contact/franchise',contactFranchiseV,sendContactFranchise);
router.post('/contact/attention',contactAttentionV,sendContactAttention);


router.get('/help',help);
router.get('/we',we);


module.exports = router