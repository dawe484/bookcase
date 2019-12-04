import React from 'react';

import Book from '../books/Book';

import './BookPage.css';

const BookPage = ({ match }) => {
  return <Book urlAddress={match.params.urlTitle} />;
};

export default BookPage;
