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
  }

  let allGenres = [
    {
      genre: '',
      count: 0
    }
  ];

  const filterGenres = () => {
    let index = 0;
    newBooksArr.map(book => {
      console.log(book.genres);
      book.genres.map(genre => {
        // console.log(genre);
        // console.log(book.genres.length);
        for (let i = 0; i <= 2 * newBooksArr.length; i++) {
          console.log(i, genre);
        }
        // console.log(allGenres);
      });
    });
  };

  filterGenres();

  const onFilterClick = () => {};

  return (
    <div className='container'>
      <div className='books-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-newspaper' aria-hidden='true' />
            {/* <h1>Books</h1> */}
            <h1>Novinky</h1>
          </div>
        </div>
        <div className='books-divider'>
          <aside className='filters'>
            <div className='filters-title'>
              <h2>
                Filtrujte
                <i className='fas fa-filter'></i>
              </h2>
            </div>
            <div className='filters-wrap'>
              <div className='filter'>
                <div className='filter-header closed'>
                  <h4 className='filter-trigger'>
                    <div className='name'>
                      <span data-text='Žánry'>Žánry</span>
                    </div>
                    <div className='icon'>
                      <i className='far fa-plus-square' aria-hidden='true' />
                      <i className='far fa-plus-square' aria-hidden='true' />
                    </div>
                  </h4>
                </div>
                <div className='filter-content'>
                  <div className='filter-checkbox'>
                    <input
                      type='checkbox'
                      id='categories'
                      name='Categories'
                      value='Categories'
                    />
                    <label htmlFor='categories'>
                      <i></i>
                      <span>
                        Fantasy<small>({})</small>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className='filter'>
                <div className='filter-header closed'>
                  <h4 className='filter-trigger'>
                    <div className='name'>
                      <span data-text='Nakladatelství'>Nakladatelství</span>
                    </div>
                    <div className='icon'>
                      <i className='far fa-plus-square' aria-hidden='true' />
                      <i className='far fa-plus-square' aria-hidden='true' />
                    </div>
                  </h4>
                </div>
              </div>
              <div className='filter'>
                <div className='filter-header closed'>
                  <h4 className='filter-trigger'>
                    <div className='name'>
                      <span data-text='Jazyky'>Jazyky</span>
                    </div>
                    <div className='icon'>
                      <i className='far fa-plus-square' aria-hidden='true' />
                      <i className='far fa-plus-square' aria-hidden='true' />
                    </div>
                  </h4>
                </div>
              </div>
            </div>
          </aside>
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
              <div className=''>
                <h1>Načítám novinky...</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
