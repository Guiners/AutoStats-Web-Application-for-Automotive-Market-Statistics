import express from 'express';
const LoginController = require('../controllers/LoginController');
const jwtAuth = require('../middlewear/jwtAuth');

const router = express.Router();

router.route('/register')
    .post(jwtAuth.auth, LoginController.handleRegister)

router.route('/login')
    .post(jwtAuth.auth, LoginController.handleLogin)
    
module.exports = router;