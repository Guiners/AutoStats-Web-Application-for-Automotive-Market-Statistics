import express from 'express';
const LoginController = require('../controllers/LoginController');
const jwtAuth = require('../middlewear/jwtAuth');

const router = express.Router();

router.route('/register')
    .post(LoginController.handleRegister)

router.route('/login')
    .post(LoginController.handleLogin)
    
module.exports = router;