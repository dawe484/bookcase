const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
// const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
// const Contact = require('../models/Contact');

// @route     GET api/books
// @desc      Get all books in DB
// @access    Public
router.get('/', (req, res) => {
  res.send('Get all books');
});

// @route     GET api/books
// @desc      Get all user books
// @access    Private
router.get('/',
  (res, req) => {
    res.send('Get all user books');
  }
  // auth, async (req, res) => {
  // try {
  //   const contacts = await Contact.find({ user: req.user.id }).sort({
  //     date: -1
  //   }); // most recent contacts first
  //   res.json(contacts);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server Error');
  // }
);

// @route     POST api/books
// @desc      Add new book
// @access    Private
router.post(
  '/',
  (req, res) => {
    res.send('Add book');
  }
  // [
  //   auth,
  //   [
  //     check('name', 'Name is required')
  //       .not()
  //       .isEmpty()
  //   ]
  // ],
  // async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   const { name, email, phone, type } = req.body;

  //   try {
  //     const newContact = new Contact({
  //       name,
  //       email,
  //       phone,
  //       type,
  //       user: req.user.id
  //     });

  //     const contact = await newContact.save();

  //     res.json(contact);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server Error'); // create snippet ??
  //   }
  // }
);

// @route     PUT api/books/:id
// @desc      Update book
// @access    Private
router.put('/:id',
  (req, res) => {
    res.send('Update book');
  }
  // auth, async (req, res) => {
  // const { name, email, phone, type } = req.body;

  // // Build contact object
  // const contactFields = {};

  // if (name) contactFields.name = name;
  // if (email) contactFields.email = email;
  // if (phone) contactFields.phone = phone;
  // if (type) contactFields.type = type;

  // try {
  //   let contact = await Contact.findById(req.params.id);

  //   if (!contact) return res.status(404).json({ msg: 'Contact not found' });

  //   // Make sure user owns contact
  //   if (contact.user.toString() !== req.user.id) {
  //     return res.status(401).json({ msg: 'Not authorized' });
  //   }

  //   contact = await Contact.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $set: contactFields
  //     },
  //     { new: true }
  //   );

  //   res.json(contact);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server Error');
  // }
);

// @route     DELETE api/books/:id
// @desc      Delete book
// @access    Private
router.delete('/:id',
  (req, res) => {
    res.send('Delete book');
  }
  // auth, async (req, res) => {
  // try {
  //   let contact = await Contact.findById(req.params.id);

  //   if (!contact) return res.status(404).json({ msg: 'Contact not found' });

  //   // Make sure user owns contact
  //   if (contact.user.toString() !== req.user.id) {
  //     return res.status(401).json({ msg: 'Not authorized' });
  //   }

  //   await Contact.findByIdAndRemove(req.params.id);

  //   res.json({ msg: 'Contact removed' });
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server Error');
  // }
);

module.exports = router;
