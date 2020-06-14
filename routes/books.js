const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Author = require('../models/Author');
const User = require('../models/User');
const Book = require('../models/Book');

// @route     POST api/books
// @desc      Add new book
// @access    Public
router.post(
  '/',
  [
    check('title', "Please fill in the book's title")
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
      title,
      isbn,
      series,
      seriesNumber,
      formats,
      genres,
      language,
      pages,
      bookCover,
      bookCoverAuthor,
      ilustration,
      bookStatus,
      yearOfPublish,
      publisher,
      originalTitle,
      translator,
      youtube,
      annotation,
      author
    } = req.body;

    try {
      let book = await Book.findOne({ title, author });
      let findAuthor = await Author.findOne({ _id: author });

      if (book) {
        return res
          .status(400)
          .json({ msg: 'Book with this author already exists' });
      } else {
        const urlTitle = title
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

        book = new Book({
          urlTitle,
          title,
          isbn,
          series,
          seriesNumber,
          formats,
          genres,
          language,
          pages,
          bookCover,
          bookCoverAuthor,
          ilustration,
          bookStatus,
          yearOfPublish,
          publisher,
          originalTitle,
          translator,
          youtube,
          annotation,
          author
        });
      }

      await book.save();

      await findAuthor.book.push(book._id);
      await findAuthor.save();
      // console.log(book);

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      console.log("Error: Can't save book", title);
    }
  }
);

// @route     PUT api/books/:title
// @desc      Update book
// @access    Private
router.put('/:urlTitle', auth, async (req, res) => {
  const { title, author } = req.body;

  // Build book object
  const bookFields = {};

  if (title) bookFields.title = title;
  if (author) bookFields.author = author;

  try {
    let book = await Book.findOne({ urlTitle: req.params.urlTitle });
    // console.log(book.title);

    if (!book) return res.status(404).json({ msg: 'Book not found' });

    // Make sure user can update author
    let user = await User.findById(req.user.id).select(
      '-_id -password -date -__v'
    );

    if (user.role !== 'superhero') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // if (book.title === title) {
    //   res.send('No change');
    // } else {
    //   const urlTitle = title
    //     .replace(/ /g, '-')
    //     .toLowerCase()
    //     .concat('-', Math.floor(Math.random() * 9000) + 1000); // returns a random integer from 1000 to 9999

    //   bookFields.urlTitle = urlTitle;

    //   if (!book) return res.status(404).json({ msg: 'Book not found.' });

    book = await Book.findOneAndUpdate(
      { urlTitle: req.params.urlTitle },
      { $set: bookFields },
      { new: true }
    );

    res.json(book);
    // }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/books/:urlTitle
// @desc      Get info about the book in DB
// @access    Public
router.get('/:urlTitle', async (req, res) => {
  try {
    let book = await Book.findOne({
      urlTitle: req.params.urlTitle
    })
      .populate('author')
      .sort({ date: -1 });

    if (book.author.name !== null) {
      let author = await Author.findOne({ name: book.author.name }).populate(
        'book'
      );

      for (let i = 0; i < book.author.book.length; i++) {
        book.author.book[i] = author.book[i];
      }
    }

    if (!book) return res.status(404).json({ msg: 'Book not found' });
    else console.log('Server book:', req.params.urlTitle);

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/book-rating/:urlTitle
// @desc      Get the book rating statistics
// @access    Public
router.get('/:urlTitle', async (req, res) => {
  try {
    let book = await Book.findOne({
      urlTitle: req.params.urlTitle
    });

    if (!book) return res.status(404).json({ msg: 'Rating problem. Book not found' });
    else console.log('Server book rating:', req.params.urlTitle);

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/books
// @desc      Get all books in DB
// @access    Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({})
      .populate('author')
      .sort({ date: -1 });

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/books/:id
// @desc      Delete book
// @access    Private - only superhero
router.delete('/:urlTitle', auth, async (req, res) => {
  let user;

  try {
    user = await User.findById(req.user.id).select('-_id -password -date -__v');
    // res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      // Make sure user's role is 'superhero'
      if (user.role === 'superhero') {
        const book = await Book.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Book removed' });
        console.log(`❗ ${user.name} deleted book: ${book.name}.`);
      } else {
        return res.status(401).json({ msg: 'Not authorized' });
      }
    } else {
      return res.status(404).json({ msg: 'Book not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
