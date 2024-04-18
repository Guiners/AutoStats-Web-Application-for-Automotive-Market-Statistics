import express from 'express';
const calculationController = require('../controllers/calculationController');
const jwtAuth = require('../middlewear/jwtAuth');

const router = express.Router();

router.route('/min')
    .get(calculationController.calcMin)
    // .get(jwtAuth.auth, calculationController.calcMin)

router.route('/max')
    .get(calculationController.calcMax)
    // .get(jwtAuth.auth, calculationController.calcMax)    

router.route('/avg')
    .get(calculationController.calcAVG)
    // .get(jwtAuth.auth, calculationController.calcAVG)    

router.route('/median')
    .get(calculationController.calcMedian)
    // .get(jwtAuth.auth, calculationController.calcMedian)   

router.route('/mode')
    .get(calculationController.calcMode)
    // .get(jwtAuth.auth, calculationController.calcMode)    
    
module.exports = router;