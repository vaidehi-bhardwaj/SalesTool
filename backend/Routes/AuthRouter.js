const { login, forgotPassword, resetPassword } = require('../Controllers/AuthController');
const {  loginValidation } = require('../Middleware/AuthValidation');


const router = require('express').Router();



router.post("/login", loginValidation, login); 
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;