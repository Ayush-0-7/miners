const express = require('express');
const createorder = require('../controllers/paymentController'); 
const paymentStatus = require('../controllers/payment2Controller');
const router = express.Router();
router.route('/order').post(createorder);
router.route('/paymentStatus/:orderid').get(paymentStatus);


module.exports = router;