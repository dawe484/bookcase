import React, { Fragment, useContext, useEffect } from 'react';
import BookItem from './BookItem';
import Spinner from '../layout/Spinner';

import BookContext from '../../context/book/bookContext';
// import AuthorContext from '../../context/author/authorContext';

const Books = () => {
  const bookContext = useContext(BookContext);
  // const authorContext = useContext(AuthorContext);

  const { books, filtered, getBooks, loading, clearBook } = bookContext;
  // const { clearAuthor } = authorContext;

  useEffect(() => {
    // clearAuthor();
    clearBook();
    getBooks();

    // eslint-disable-next-line
  }, []);

  if (books !== null && books.length === 0 && !loading) {
    return <h4>Prosím přidejte knihu</h4>;
  }

  return (
    <Fragment>
      {books !== null && !loading ? (
        (filtered || books).map(book => <BookItem key={book._id} book={book} />)
      ) : (
        <h1>Načítám knihy...</h1>
        // <Spinner />
      )}
    </Fragment>
  );
};

export default Books;
