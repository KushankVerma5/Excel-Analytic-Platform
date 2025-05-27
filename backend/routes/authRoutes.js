const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/userValidator');

router.post('/register',validateRegister, registerUser);
router.post('/login',validateLogin ,loginUser);
router.post('/logout', logoutUser);

module.exports = router;

// For routes like /login and /register, it’s good to prevent abuse (e.g. with express-rate-limit).
// Using a validation library (like express-validator) can prevent bad or incomplete inputs at the route level.