const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     POST api/users
// @desc      Register a User
// @access    Public
router.post(
  '/',
  [
    check('signUpName', 'Please add username.')
      .not()
      .isEmpty(),
    check('signUpEmail', 'Please include a valid email address.').isEmail(),
    check(
      'signUpPassword',
      'Please enter a password with 6 or more characters.'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { signUpName, signUpEmail, signUpPassword } = req.body;

    console.log('Sign Up: ', req.body);

    try {
      let user = await User.findOne({ name: signUpName }); // same as name: name => same name in ES6
      let userEmail = await User.findOne({ email: signUpEmail });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      } else if (userEmail) {
        return res
          .status(400)
          .json({ msg: 'Account with this email address already exists' });
      } else {
        const name = signUpName;
        const email = signUpEmail;
        user = new User({
          name,
          email,
          signUpPassword
        });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(signUpPassword, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      console.log('Sign Up Error: ', signUpName, signUpEmail, signUpPassword);
    }
  }
);

module.exports = router;
