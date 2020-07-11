import React, { Fragment, useContext, useEffect } from 'react';
import BookDetail from './BookDetail';

import BookContext from '../../context/book/bookContext';

import Spinner from '../layout/Spinner';

const Book = (data) => {
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
        <div className='container'>
          {/* <div className='list-row'>
            <div className='list-title'>
              <h1>Načítám knihu...</h1>
            </div>
          </div> */}
          <Spinner />
        </div>
      )}
    </Fragment>
  );
};

export default Book;
