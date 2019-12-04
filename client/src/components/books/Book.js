import React, { Fragment, useContext, useEffect } from 'react';
import BookDetail from './BookDetail';

import BookContext from '../../context/book/bookContext';

const Book = data => {
  const bookContext = useContext(BookContext);

  const { book, getBook, loading } = bookContext;

  useEffect(() => {
    getBook(data.urlAddress);

    // eslint-disable-next-line
  }, []);

  // console.log(data);

  return (
    <Fragment>
      {book !== null && !loading ? (
        <BookDetail key={book._id} bookData={book} />
      ) : (
        <h1>Načítám knihu...</h1>
      )}
    </Fragment>
  );
};

export default Book;
