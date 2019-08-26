const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({
  msg: 'Welcome to the Bookcase API...'
}));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
