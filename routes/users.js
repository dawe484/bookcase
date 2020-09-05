const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth'); // for protecting routes

const User = require('../models/User');

// @route     POST api/users
// @desc      Register a User
// @access    Public
router.post(
  '/',
  [
    check('signUpName', 'Please add username.').not().isEmpty(),
    check('signUpEmail', 'Please include a valid email address.').isEmail(),
    check(
      'signUpPassword',
      'Please enter a password with 6 or more characters.'
    ).isLength({
      min: 6,
    }),
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
          .json({ msg: 'User with this email address already exists' });
      } else {
        const name = signUpName;
        const email = signUpEmail;
        user = new User({
          name,
          email,
          signUpPassword,
        });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(signUpPassword, salt);

      await user.save();

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
      res.status(500).send('Server Error');
      console.log('Sign Up Error: ', signUpName, signUpEmail, signUpPassword);
    }
  }
);

// @route     PUT api/users/:username
// @desc      Update the User
// @access    Private
router.put('/:name', auth, async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    date,
    userImage,
    realName,
    birthdate,
    facebook,
    instagram,
    twitter,
    statistics,
    justReading,
    alreadyRead,
    favouriteBooks,
    favouriteAuthors,
    eBookshelf,
    wantToRead,
  } = req.body;

  // Build user object
  const userFields = {};

  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (password) userFields.password = password;
  if (role) userFields.role = role;
  if (date) userFields.date = date;
  if (userImage) userFields.userImage = userImage;
  if (realName) userFields.realName = realName;
  if (birthdate) userFields.birthdate = birthdate;
  if (facebook) userFields.facebook = facebook;
  if (instagram) userFields.instagram = instagram;
  if (twitter) userFields.twitter = twitter;
  if (statistics) userFields.statistics = statistics;
  if (justReading) userFields.justReading = justReading;
  if (alreadyRead) userFields.alreadyRead = alreadyRead;
  if (favouriteBooks) userFields.favouriteBooks = favouriteBooks;
  if (favouriteAuthors) userFields.favouriteAuthors = favouriteAuthors;
  if (eBookshelf) userFields.eBookshelf = eBookshelf;
  if (wantToRead) userFields.wantToRead = wantToRead;

  try {
    let user = await User.findOne({
      name: req.params.username,
    });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Only authorized user can update user data (do it on client side ??)
    user = await User.findOneAndUpdate(
      { name: req.params.username },
      { $set: userFields },
      { new: true }
    );

    await user.save();

    console.log('User updated!');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/users
// @desc      Get all users from DB
// @access    Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
