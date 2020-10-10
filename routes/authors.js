const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // for protecting routes
const { check, validationResult } = require('express-validator');

const Author = require('../models/Author');
const User = require('../models/User');
const Book = require('../models/Book');

const urlName = (name) => {
  return (urlAddress = name
    .replace(/ /g, '-')
    .replace(/:/g, '-')
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
    .replace(/ø/g, 'o')
    .toLowerCase()
    .concat('-', Math.floor(Math.random() * 9000) + 1000)); // returns a random integer from 1000 to 9999
};

// @route     POST api/authors
// @desc      Add an author to DB
// @access    Private
router.post(
  '/',
  [check('name', "Please fill in the author's full name").not().isEmpty()],
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
      portraitAuthorLink,
      portraitAuthorLicense,
      portraitAuthorLicenseLink,
      portrait,
      resumeSource,
      resume,
      website,
      facebook,
      instagram,
      twitter,
      wikipedia,
    } = req.body;

    try {
      if (req.user.role === 'superhero') {
        const authorNotExists = await Author.find({ name });
        const pseudonymExists = await Author.findOne({ pseudonym: name });

        if (pseudonymExists) {
          return res.status(400).json({
            msg: `Author of the name already exists under the given pseudonym.\nLook at the author ${pseudonymExists.name}`,
          });
        } else {
          if (authorNotExists.length === 0) {
            const urlAuthorName = urlName(name);

            const newAuthor = new Author({
              urlAuthorName,
              name,
              pseudonym,
              birthdate,
              deathdate,
              nationality,
              portraitAuthorName,
              portraitAuthorLink,
              portraitAuthorLicense,
              portraitAuthorLicenseLink,
              portrait,
              resumeSource,
              resume,
              website,
              facebook,
              instagram,
              twitter,
              wikipedia,
            });

            const author = await newAuthor.save();

            res.json(author);
            console.log(`✔ ${req.user.name} added the author '${author.name}'`);
          } else {
            return res.status(400).json({ msg: `Author already exists.` });
          }
        }
      } else {
        return res
          .status(401)
          .json({ msg: `You don't have permission to save the new author.` });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      console.log(`Error: Can't save the author '${name}'`);
    }
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
    portraitAuthorLink,
    portraitAuthorLicense,
    portraitAuthorLicenseLink,
    portrait,
    resumeSource,
    resume,
    website,
    facebook,
    instagram,
    twitter,
    wikipedia,
  } = req.body;

  // Build author object
  const authorFields = {};

  if (name) authorFields.name = name;
  if (pseudonym) authorFields.pseudonym = pseudonym;
  if (birthdate) authorFields.birthdate = birthdate;
  if (deathdate) authorFields.deathdate = deathdate;
  if (nationality) authorFields.nationality = nationality;
  if (portraitAuthorName) authorFields.portraitAuthorName = portraitAuthorName;
  if (portraitAuthorLink) authorFields.portraitAuthorLink = portraitAuthorLink;
  if (portraitAuthorLicense)
    authorFields.portraitAuthorLicense = portraitAuthorLicense;
  if (portraitAuthorLicenseLink)
    authorFields.portraitAuthorLicenseLink = portraitAuthorLicenseLink;
  if (portrait) authorFields.portrait = portrait;
  if (resumeSource) authorFields.resumeSource = resumeSource;
  if (resume) authorFields.resume = resume;
  if (website) authorFields.website = website;
  if (facebook) authorFields.facebook = facebook;
  if (instagram) authorFields.instagram = instagram;
  if (twitter) authorFields.twitter = twitter;
  if (wikipedia) authorFields.wikipedia = wikipedia;

  try {
    if (req.user.role === 'superhero') {
      let author = await Author.findOne({
        urlAuthorName: req.params.urlAuthorName,
      });

      if (!author) return res.status(404).json({ msg: 'Author not found.' });

      const t_name = author.name;

      if (author.name === name) {
        author = await Author.findOneAndUpdate(
          { urlAuthorName: req.params.urlAuthorName },
          { $set: authorFields },
          { new: true }
        );
      } else {
        authorFields.urlAuthorName = urlName(name);

        author = await Author.findOneAndUpdate(
          { urlAuthorName: req.params.urlAuthorName },
          { $set: authorFields },
          { new: true }
        );
      }

      res.json(author);
      console.log(
        `✎ ${req.user.name} updated the author '${t_name}' to '${author.name}'`
      );
    } else {
      return res
        .status(401)
        .json({ msg: `You don't have permission to update the author.` });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/authors/:urlAuthorName
// @desc      Delete author
// @access    Private
router.delete('/:urlAuthorName', auth, async (req, res) => {
  try {
    if (req.user.role === 'superhero') {
      let author = await Author.findOne({
        urlAuthorName: req.params.urlAuthorName,
      });

      if (!author) return res.status(404).json({ msg: 'Author not found.' });

      author.book.map(async (book_id) => {
        let findBook = await Book.findByIdAndDelete(book_id);
        console.log(
          `✘ ${req.user.name} deleted the book '${findBook.title}' by '${author.name}'`
        );
      });

      author = await Author.findOneAndDelete({
        urlAuthorName: req.params.urlAuthorName,
      });

      res.json({ msg: 'Author removed.' });
      console.log(`✘ ${req.user.name} deleted the author '${author.name}'`);
    } else {
      return res
        .status(401)
        .json({ msg: `You don't have permission to delete the author.` });
    }
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
      urlAuthorName: req.params.urlAuthorName,
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
    const authors = await Author.find({}).populate('book').sort({ date: -1 });

    res.json(authors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
