import React, { useContext, useEffect } from 'react';

import BookItem from '../books/BookItem';

import BookContext from '../../context/book/bookContext';

import './NewsPage.css';

const NewsPage = () => {
  const bookContext = useContext(BookContext);

  const { books, getBooks, clearBook, loading } = bookContext;

  useEffect(() => {
    clearBook();
    getBooks();
  }, []);

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dateDiffInDays = (d1, d2) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    return days;
  };

  let newBooksArr = [];

  if (books !== null && !loading) {
    books.map(book => {
      if (dateDiffInDays(new Date(book.date), new Date()) <= 30)
        newBooksArr.push(book);
    });
    // console.log(newBooksArr);
  }

  return (
    <div className='container'>
      <div className='books-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-newspaper' aria-hidden='true' />
            {/* <h1>Books</h1> */}
            <h1>Novinky</h1>
          </div>
          {/* <div className='search-pos'>
            <BooksFilter />
          </div> */}
        </div>
        <div className='books-divider'>
          <aside className='category-aside'></aside>
          <div className='items-list'>
            {/* {dateDiffInDays(new Date(book.date), new Date()) <= 30 && (
              <i className='book-status-label bsl--new' data-label='Novinka'>
                <span className='show'>N</span>
                <span className='show'>ovinka</span>
              </i>
            )} */}
            {books !== null && newBooksArr !== null && !loading ? (
              newBooksArr.map(book => <BookItem key={book._id} book={book} />)
            ) : (
              <h1>Načítám novinky...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
