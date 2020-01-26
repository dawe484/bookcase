const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // for protecting routes
const { check, validationResult } = require('express-validator');

const Author = require('../models/Author');
const User = require('../models/User');
const Book = require('../models/Book');

// @route     POST api/authors
// @desc      Add an author to DB
// @access    Public
router.post(
  '/',
  [
    check('name', "Please fill in the author's full name")
      .not()
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      pseudonym,
      birthdate,
      deathdate,
      nationality,
      portraitAuthorName,
      portrait,
      resumeSource,
      resume,
      website,
      facebook,
      instagram,
      twitter
    } = req.body;

    try {
      let author = await Author.findOne({ name }); // same as name: name => same name in ES6

      if (author) {
        return res.status(400).json({ msg: 'Author already exists' });
      } else {
        const urlAuthorName = name
          .replace(/ /g, '-')
          .replace(/ě/gi, 'e')
          .replace(/š/gi, 's')
          .replace(/č/gi, 'c')
          .replace(/ř/gi, 'r')
          .replace(/ž/gi, 'z')
          .replace(/ý/gi, 'y')
          .replace(/á/gi, 'a')
          .replace(/í/gi, 'i')
          .replace(/é/gi, 'e')
          .replace(/ú/gi, 'u')
          .replace(/ů/gi, 'u')
          .replace(/ň/gi, 'n')
          .replace(/ď/gi, 'd')
          .replace(/ť/gi, 't')
          .toLowerCase()
          .concat('-', Math.floor(Math.random() * 9000) + 1000); // returns a random integer from 1000 to 9999

        author = new Author({
          urlAuthorName,
          name,
          pseudonym,
          birthdate,
          deathdate,
          nationality,
          portraitAuthorName,
          portrait,
          resumeSource,
          resume,
          website,
          facebook,
          instagram,
          twitter
        });
      }

      await author.save();
      // res.send('Author saved');
      res.json(author);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      console.log("Error: Can't save author", name);
    }

    // try {
    //   const authorNotExists = await Author.find({ name });
    //   const pseudonymExists = await Author.findOne({ pseudonym: name });

    //   if (pseudonymExists) {
    //     return res.status(400).json({ msg: `Author of the name already exists under the given pseudonym.` });
    //     // console.log(`Author of the name already exists under the given pseudonym.\nLook at the author ${pseudonymExists.name}`);
    //   // if (pseudonymExists.length > 0) {
    //     // console.log(pseudonymExists);

    //     // pseudonymExists.forEach(element => {
    //     //   if (element.pseudonym.includes(name)) {
    //     //     console.log(`Author of the name already exists under the given pseudonym.\nLook at the author ${element.name}`);
    //     //     // res.send(`Author of the name already exists under the given pseudonym.
    //     //     // Look at the author ${element.name}`);
    //     //   }
    //     // });
    //   } else {
    //     if (authorNotExists.length === 0) {
    //       const urlAuthorName = name
    //         .replace(/ /g, '-')
    //         .toLowerCase()
    //         .concat('-', Math.floor(Math.random() * 9000) + 1000); // returns a random integer from 1000 to 9999

    //       const newAuthor = new Author({
    //         urlAuthorName,
    //         name,
    //         pseudonym,
    //         birthdate,
    //         deathdate,
    //         nationality,
    //         portraitAuthorName,
    //         portrait,
    //         resumeSource,
    //         resume,
    //         website,
    //         facebook,
    //         instagram,
    //         twitter
    //       });

    //       const author = await newAuthor.save();

    //       // res.send('Author saved');
    //       res.json(author);
    //     } else {
    //       return res.status(400).json({ msg: `Author already exists` });
    //       // res.json('Author already exists');
    //     }
    //   }
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send('Server Error');
    // }
  }
);

// @route     PUT api/authors/:urlAuthorName
// @desc      Update author
// @access    Private
router.put('/:urlAuthorName', auth, async (req, res) => {
  const {
    name,
    pseudonym,
    birthdate,
    deathdate,
    nationality,
    portraitAuthorName,
    portrait,
    resumeSource,
    resume,
    website,
    facebook,
    instagram,
    twitter
  } = req.body;

  // Build author object
  const authorFields = {};

  if (name) authorFields.name = name;
  if (pseudonym) authorFields.pseudonym = pseudonym;
  if (birthdate) authorFields.birthdate = birthdate;
  if (deathdate) authorFields.deathdate = deathdate;
  if (nationality) authorFields.nationality = nationality;
  if (portraitAuthorName) authorFields.portraitAuthorName = portraitAuthorName;
  if (portrait) authorFields.portrait = portrait;
  if (resumeSource) authorFields.resumeSource = resumeSource;
  if (resume) authorFields.resume = resume;
  if (website) authorFields.website = website;
  if (facebook) authorFields.facebook = facebook;
  if (instagram) authorFields.instagram = instagram;
  if (twitter) authorFields.twitter = twitter;

  try {
    let author = await Author.findOne({
      urlAuthorName: req.params.urlAuthorName
    });

    if (!author) return res.status(404).json({ msg: 'Author not found' });

    // Make sure user can update author
    let user = await User.findById(req.user.id).select(
      '-_id -password -date -__v'
    );

    if (user.role !== 'superhero') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    author = await Author.findOneAndUpdate(
      { urlAuthorName: req.params.urlAuthorName },
      { $set: authorFields },
      { new: true }
    );

    res.json(author);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/authors/:urlAuthorName
// @desc      Get info about the author in DB
// @access    Public
router.get('/:urlAuthorName', async (req, res) => {
  try {
    let author = await Author.findOne({
      urlAuthorName: req.params.urlAuthorName
    })
      .populate('book')
      .sort({ date: -1 });

    if (!author) return res.status(404).json({ msg: 'Author not found' });
    else console.log('Server author:', req.params.urlAuthorName);

    res.json(author);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/authors
// @desc      Get all authors in DB
// @access    Public
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find({})
      .populate('book')
      .sort({ date: -1 });

    res.json(authors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/authors/:id
// @desc      Delete author
// @access    Private - only superhero
router.delete('/:urlAuthorName', auth, async (req, res) => {
  let user;

  try {
    user = await User.findById(req.user.id).select('-_id -password -date -__v');
    // res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      // Make sure user's role is 'superhero'
      if (user.role === 'superhero') {
        const authorsBooks = await Book.deleteMany({
          author: req.params.id
        });
        const author = await Author.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Author removed' });
        console.log(`❗ ${user.name} deleted author: ${author.name}.`);
      } else {
        return res.status(401).json({ msg: 'Not authorized' });
      }
      // @TODO: dodělat i mazání knih, když se smaže autor
    } else {
      return res.status(404).json({ msg: 'Author not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
