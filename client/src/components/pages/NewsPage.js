import React, { useContext, useEffect } from 'react';

import Spinner from '../layout/Spinner';
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
    books.map((book) => {
      if (dateDiffInDays(new Date(book.date), new Date()) <= 30)
        newBooksArr.push(book);
    });
    // console.log(newBooksArr);
  }

  let allFormats = [];
  let allGenres = [];
  let allPublisher = [];
  let allLanguage = [];

  const fnc = (arr, bookParam) => {
    let bookItemObj = {
      text: '',
      count: 1,
    };

    bookItemObj.text = bookParam;

    let index = 0;

    if (
      arr.some((objItem) => {
        index++;
        // console.log(index, objItem.text);
        return objItem.text === bookItemObj.text;
      })
    ) {
      // console.log('Object found inside the array.');
      arr[index - 1].count++;
    } else {
      // console.log('Object not found.');
      arr.push(bookItemObj);
    }
  };

  const filterContentInsideArray = (arr, marker) => {
    newBooksArr.map((book) => {
      if (marker === 'formats') {
        book.formats.map((format) => fnc(arr, format));
      }
      if (marker === 'genres') book.genres.map((genre) => fnc(arr, genre));
    });

    // if (newBooksArr.length !== 0) console.log(arr);
  };

  const filterContent = (arr, marker) => {
    newBooksArr.map((book) => {
      if (marker === 'language') fnc(arr, book.language);
      if (marker === 'publisher') fnc(arr, book.publisher);
    });

    // if (newBooksArr.length !== 0) console.log(arr);
  };

  filterContentInsideArray(allFormats, 'formats');
  filterContentInsideArray(allGenres, 'genres');
  filterContent(allLanguage, 'language');
  filterContent(allPublisher, 'publisher');

  const renderFilterContent = (title, count) => {
    return (
      <div className='filter-checkbox' key={title}>
        <input type='checkbox' id={title} name={title} value={title} />
        <label htmlFor={title}>
          <i></i>
          <span>
            {title}
            &nbsp;<small>({count})</small>
          </span>
        </label>
      </div>
    );
  };

  const onFilterClick = () => {};

  const img1 = 'far fa-plus-square';
  const img2 = 'far fa-minus-square';

  const filterCategory = (element1, element2, i) => {
    element1.className = element1.className === img1 ? img2 : img1;
    element2.className = element1.className;

    if (element1.className === img1)
      document.getElementsByClassName('filter-content')[i].style.display =
        'none';
    else
      document.getElementsByClassName('filter-content')[i].style.display =
        'block';
  };

  const toggleFilterCategory1 = () => {
    let element1a = document.getElementById('toggleCategory1a');
    let element1b = document.getElementById('toggleCategory1b');

    filterCategory(element1a, element1b, 0);
  };

  const toggleFilterCategory2 = () => {
    let element2a = document.getElementById('toggleCategory2a');
    let element2b = document.getElementById('toggleCategory2b');

    filterCategory(element2a, element2b, 1);
  };

  const toggleFilterCategory3 = () => {
    let element3a = document.getElementById('toggleCategory3a');
    let element3b = document.getElementById('toggleCategory3b');

    filterCategory(element3a, element3b, 2);
  };

  const toggleFilterCategory4 = () => {
    let element4a = document.getElementById('toggleCategory4a');
    let element4b = document.getElementById('toggleCategory4b');

    filterCategory(element4a, element4b, 3);
  };

  return (
    <div className='container'>
      <div className='books-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-newspaper' aria-hidden='true' />
            <h1>Novinky</h1>
          </div>
        </div>
        {books !== null && newBooksArr !== null && !loading ? (
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
                  <div
                    className='filter-header closed'
                    onClick={toggleFilterCategory1}
                  >
                    <h4 className='filter-trigger'>
                      <div className='name'>
                        <span data-text='Žánry'>Žánry</span>
                      </div>
                      <div className='icon'>
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory1a'
                        />
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory1b'
                        />
                      </div>
                    </h4>
                  </div>
                  <div className='filter-content'>
                    {books !== null &&
                      !loading &&
                      allGenres.map((item) =>
                        renderFilterContent(item.text, item.count)
                      )}
                  </div>
                </div>
                <div className='filter'>
                  <div
                    className='filter-header closed'
                    onClick={toggleFilterCategory2}
                  >
                    <h4 className='filter-trigger'>
                      <div className='name'>
                        <span data-text='Nakladatelství'>Nakladatelství</span>
                      </div>
                      <div className='icon'>
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory2a'
                        />
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory2b'
                        />
                      </div>
                    </h4>
                  </div>
                  <div className='filter-content'>
                    {books !== null &&
                      !loading &&
                      allPublisher.map((item) =>
                        renderFilterContent(item.text, item.count)
                      )}
                  </div>
                </div>
                <div className='filter'>
                  <div
                    className='filter-header closed'
                    onClick={toggleFilterCategory3}
                  >
                    <h4 className='filter-trigger'>
                      <div className='name'>
                        <span data-text='Jazyky'>Jazyky</span>
                      </div>
                      <div className='icon'>
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory3a'
                        />
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory3b'
                        />
                      </div>
                    </h4>
                  </div>
                  <div className='filter-content'>
                    {books !== null &&
                      !loading &&
                      allLanguage.map((item) =>
                        renderFilterContent(item.text, item.count)
                      )}
                  </div>
                </div>
                <div className='filter'>
                  <div
                    className='filter-header closed'
                    onClick={toggleFilterCategory4}
                  >
                    <h4 className='filter-trigger'>
                      <div className='name'>
                        <span data-text='Formáty'>Formáty</span>
                      </div>
                      <div className='icon'>
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory4a'
                        />
                        <i
                          className='far fa-plus-square'
                          aria-hidden='true'
                          id='toggleCategory4b'
                        />
                      </div>
                    </h4>
                  </div>
                  <div className='filter-content'>
                    {books !== null &&
                      !loading &&
                      allFormats.map((item) =>
                        renderFilterContent(item.text, item.count)
                      )}
                  </div>
                </div>
              </div>
            </aside>
            <div className='books-origin'>
              <div className='items-list'>
                {/* {dateDiffInDays(new Date(book.date), new Date()) <= 30 && (
                <i className='book-status-label bsl--new' data-label='Novinka'>
                  <span className='show'>N</span>
                  <span className='show'>ovinka</span>
                </i>
              )} */}
                {books !== null && newBooksArr !== null && !loading
                  ? newBooksArr.map((book) => (
                      <BookItem key={book._id} book={book} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
          // <div className=''>
          //   <h1>Načítám novinky...</h1>
          // </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
