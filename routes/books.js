const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Author = require('../models/Author');
const User = require('../models/User');
const Book = require('../models/Book');

const urlBookTitle = (title) => {
  return (urlAddress = title
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

// @route     POST api/books
// @desc      Add a book to DB
// @access    Private
router.post(
  '/',
  [check('title', `Please fill in the book's title.`).not().isEmpty()],
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
      yearOfPublication,
      publisher,
      originalTitle,
      yearOfPublicationOriginal,
      translator,
      youtube,
      annotation,
      author,
    } = req.body;

    try {
      if (req.user.role === 'superhero') {
        let book = await Book.findOne({ title, author });
        let findAuthor = await Author.findOne({ _id: author });

        if (book) {
          return res
            .status(400)
            .json({ msg: `Book with this author already exists.` });
        } else {
          const urlTitle = urlBookTitle(title);

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
            yearOfPublication,
            publisher,
            originalTitle,
            yearOfPublicationOriginal,
            translator,
            youtube,
            annotation,
            author,
          });
        }

        await book.save();

        await findAuthor.book.push(book._id);
        await findAuthor.save();

        res.json(book);
        console.log(
          `✔ ${req.user.name} added the book '${book.title}' to the author '${findAuthor.name}'`
        );
      } else {
        return res
          .status(401)
          .json({ msg: `You don't have permission to save the new author.` });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      console.log(`Error: Can't save the book '${title}'`);
    }
  }
);

// @route     PUT api/books/:urlTitle
// @desc      Update book
// @access    Private
router.put('/:urlTitle', auth, async (req, res) => {
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
    yearOfPublication,
    publisher,
    originalTitle,
    yearOfPublicationOriginal,
    translator,
    youtube,
    annotation,
    author,
  } = req.body;

  // Build book object
  const bookFields = {};

  if (title) bookFields.title = title;
  if (isbn) bookFields.isbn = isbn;
  if (series) bookFields.series = series;
  if (seriesNumber) bookFields.seriesNumber = seriesNumber;
  if (formats) bookFields.formats = formats;
  if (genres) bookFields.genres = genres;
  if (language) bookFields.language = language;
  if (pages) bookFields.pages = pages;
  if (bookCover) bookFields.bookCover = bookCover;
  if (bookCoverAuthor) bookFields.bookCoverAuthor = bookCoverAuthor;
  if (ilustration) bookFields.ilustration = ilustration;
  if (bookStatus) bookFields.bookStatus = bookStatus;
  if (yearOfPublication) bookFields.yearOfPublication = yearOfPublication;
  if (publisher) bookFields.publisher = publisher;
  if (originalTitle) bookFields.originalTitle = originalTitle;
  if (yearOfPublicationOriginal)
    bookFields.yearOfPublicationOriginal = yearOfPublicationOriginal;
  if (translator) bookFields.translator = translator;
  if (youtube) bookFields.youtube = youtube;
  if (annotation) bookFields.annotation = annotation;
  if (author) bookFields.author = author;

  try {
    if (req.user.role === 'superhero') {
      let book = await Book.findOne({ urlTitle: req.params.urlTitle });

      if (!book) return res.status(404).json({ msg: 'Book not found.' });

      const t_title = book.title;

      if (book.title === title) {
        book = await Book.findOneAndUpdate(
          { urlTitle: req.params.urlTitle },
          { $set: bookFields },
          { new: true }
        );
      } else {
        bookFields.urlTitle = urlBookTitle(title);

        book = await Book.findOneAndUpdate(
          { urlTitle: req.params.urlTitle },
          { $set: bookFields },
          { new: true }
        );
      }

      res.json(book);
      console.log(
        `✎ ${req.user.name} updated the book '${t_title}' to '${book.title}'`
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

// @route     DELETE api/books/:urlTitle
// @desc      Delete book
// @access    Private
router.delete('/:urlTitle', auth, async (req, res) => {
  try {
    if (req.user.role === 'superhero') {
      let book = await Book.findOne({
        urlTitle: req.params.urlTitle,
      });

      let findAuthor = await Author.findOne({ _id: book.author });

      if (!book) return res.status(404).json({ msg: 'Book not found.' });

      book = await Book.findOneAndDelete({
        urlTitle: req.params.urlTitle,
      });

      await findAuthor.book.pull(book._id);
      await findAuthor.save();

      res.json({ msg: 'Book removed.' });
      console.log(`✘ ${req.user.name} deleted the book '${book.title}'`);
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

// @route     GET api/books/:urlTitle
// @desc      Get info about the book in DB
// @access    Public
router.get('/:urlTitle', async (req, res) => {
  try {
    let book = await Book.findOne({
      urlTitle: req.params.urlTitle,
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
      urlTitle: req.params.urlTitle,
    });

    if (!book)
      return res.status(404).json({ msg: 'Rating problem. Book not found' });
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
    const books = await Book.find({}).populate('author').sort({ date: -1 });

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
