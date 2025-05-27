const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const { validateProfileUpdate } = require('../validators/userValidator');

router.get('/me', protect, getProfile);
router.put('/update', protect, updateProfile);
router.put('/update', protect, validateProfileUpdate, updateProfile);

module.exports = router;
