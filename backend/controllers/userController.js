const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const bcrypt = require('bcryptjs');
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    next(err);
  }
};


// Add input validation via validators/userValidator.js for name, email, and password updates.

// Avoid overwriting email without verification in production.

// Sanitize the request body (e.g., avoid letting users update protected fields like _id).