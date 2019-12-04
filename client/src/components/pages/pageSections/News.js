import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import BookContext from '../../../context/book/bookContext';

import news from './news.json';

const NewsPage = () => {
  const bookContext = useContext(BookContext);
  const { sectionIcon, sectionTitle } = news;

  const { books, loading } = bookContext;

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
      if (newBooksArr.length < 5) newBooksArr.push(book);
    });

    // console.log(newBooksArr);
  }

  const renderBook = book => {
    return (
      <div className='book-item' key={book._id}>
        <div className='book-card'>
          {book.bookCover ? (
            <div className='book-c_content'>
              <figure className='book-card_image'>
                <img src={book.bookCover} alt='' />
              </figure>
              <div className='book-card_content'>
                <div className='bc-content_inner'>
                  <h2>
                    <Link
                      to={{
                        pathname: `/books/${book.urlTitle}`,
                        urlTitle: book.urlTitle
                      }}
                      className=''
                    >
                      {book.title}
                    </Link>
                  </h2>
                  <div className='bc-content_author'>
                    <span>
                      <Link
                        to={{
                          pathname: `/authors/${book.author.urlAuthorName}`,
                          urlName: book.author.urlAuthorName
                        }}
                        className='author'
                      >
                        {book.author.name}
                      </Link>
                    </span>
                  </div>
                  {book.annotation ? (
                    <p>{book.annotation.substring(0, 100).concat('...')}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div>No image found</div>
          )}
          {book.bookCover ? (
            <div className='book-status-labels'>
              {dateDiffInDays(new Date(book.date), new Date()) <= 30 && (
                <i className='book-status-label bsl--new' data-label='Novinka'>
                  <span className='show'>N</span>
                  <span className='show'>ovinka</span>
                </i>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className='homepage-list-container'>
      <div className='list-row'>
        <div className='list-title'>
          <i className={sectionIcon} aria-hidden='true' />
          <h1>{sectionTitle}</h1>
        </div>
        <div>
          <a href='/' className='btn'>
            Zobrazit vše
          </a>
        </div>
      </div>
      <div className='homepage-list-news' id='hpln'>
        {books !== null && !loading ? (
          newBooksArr !== [] && newBooksArr.length === 5 ? (
            newBooksArr.map(book => renderBook(book))
          ) : null
        ) : (
          <h1>Načítám...</h1>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
