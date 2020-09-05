const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '-_id -password -date -__v'
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Auth user and get token
// @access    Public
router.post(
  '/',
  [
    check('signInEmail', 'Please include a valid email').isEmail(),
    check('signInPassword', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { signInEmail, signInPassword } = req.body;

    console.log('Sign In: ', req.body);

    try {
      let user = await User.findOne({ email: signInEmail });

      if (!user) {
        return res.status(400).json({ msg: 'Wrong email or password' });
      }

      const isMatch = await bcrypt.compare(signInPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong email or password' }); // Wrong password
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  }
);

module.exports = router;
