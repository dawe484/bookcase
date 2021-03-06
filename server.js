const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const connectDB = require('./config/db');

// Initialize App
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({
    msg: 'Welcome to the Bookcase API...',
  })
);

app.use(fileUpload());

// Upload Endpoints
app.post('/upload', (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: 'No file uploaded' });

  const file = req.files.file;
  const size = file.data.length;
  const extension = path.extname(file.name);

  const allowedExtensions = /png|jpeg|jpg/;

  if (!allowedExtensions.test(extension)) throw 'Unsupported extension!';

  if (size > 5000000) throw 'File must be less than 5MB';

  const address = req.headers.referer.substring(
    req.headers.referer.search('authors')
  );

  if (address === 'authors')
    file.mv(`${__dirname}/client/public/img/authors/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({
        fileName: file.name,
        filePath: `/img/authors/${file.name}`,
      });
    });
  else
    file.mv(`${__dirname}/client/public/img/books/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({
        fileName: file.name,
        filePath: `/img/books/${file.name}`,
      });
    });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/books', require('./routes/books'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
