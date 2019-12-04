import React, { useState, useContext, useEffect } from 'react';
// import { Gallery, GalleryImage } from 'react-gesture-gallery';
import { Link } from 'react-router-dom';

import BookContext from '../../context/book/bookContext';

// import News from './pageSections/News';
// import Popular from './pageSections/Popular';
// import BooksJustRead from './pageSections/BooksJustRead';

import { images } from './images/carouselImages';

import './HomePage.css';

const INITIAL_INDEX = 0;

const HomePage = () => {
  const bookContext = useContext(BookContext);

  const { books, getBooks, clearBook, loading } = bookContext;

  const [index, setIndex] = useState(INITIAL_INDEX);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (index === images.length - 1) {
  //       setIndex(INITIAL_INDEX);
  //     } else {
  //       setIndex(index + 1);
  //     }
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [index]);

  useEffect(() => {
    clearBook();
    getBooks();
  }, []);

  let fantasyBooks = 0;
  let fantasyBookCover = '';
  let thrillerBooks = 0;
  let scifiBooks = 0;

  if (books !== null && !loading) {
    books.map(book => {
      // console.log(book);
      book.genres.forEach(genre => {
        // console.log(genre);
        if (genre === 'Fantasy') {
          // console.log(book);
          fantasyBooks++;
          if (fantasyBookCover === '') fantasyBookCover = book.bookCover;
        }
        if (genre === 'Thriller') thrillerBooks++;
        if (genre === 'Sci-fi') scifiBooks++;
      });
    });
  }

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dateDiffInDays = (d1, d2) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    return days;
  };

  // News
  let newBooksArr = [];

  if (books !== null && !loading) {
    books.map(book => {
      if (newBooksArr.length < 5) newBooksArr.push(book);
    });

    // console.log(newBooksArr);
  }

  // Popular
  let popularBooksArr = [];

  if (books !== null && !loading) {
    books.map(book => {
      if (popularBooksArr.length < 5) popularBooksArr.push(book);
    });

    // console.log(popularBooksArr);
  }

  const renderBook = (book, sectionTitle) => {
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
            sectionTitle === 'Novinky' ? (
              <div className='book-status-labels'>
                {dateDiffInDays(new Date(book.date), new Date()) <= 30 && (
                  <i
                    className='book-status-label bsl--new'
                    data-label='Novinka'
                  >
                    <span className='show'>N</span>
                    <span className='show'>ovinka</span>
                  </i>
                )}
              </div>
            ) : sectionTitle === 'Populární' ? (
              <div className='book-status-labels'>
                <i
                  className='book-status-label bsl--popular'
                  data-label='Populární'
                >
                  <span className='show'>P</span>
                  <span className='show'>opulární</span>
                </i>
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    );
  };

  const pageSection = (sectionTitle, sectionIcon, sectionLink) => {
    return (
      <div className='homepage-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className={sectionIcon} aria-hidden='true' />
            <h1>{sectionTitle}</h1>
          </div>
          {sectionLink !== '' && (
            <div>
              <Link to={sectionLink} className='btn'>
                Zobrazit vše
              </Link>
            </div>
          )}
        </div>
        <div className='homepage-list-news'>
          {books !== null && !loading ? (
            newBooksArr !== [] && newBooksArr.length === 5 ? (
              newBooksArr.map(book => renderBook(book, sectionTitle))
            ) : null
          ) : (
            <h1>Načítám...</h1>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='container'>
      <div className='teaser-container'>
        <section className='book-card-carousel'>
          {/* <Gallery
            index={index}
            onRequestChange={i => {
              if (i === images.length) {
                console.log('r', i);
                setIndex(INITIAL_INDEX);
              } else {
                if (i < 0) {
                  setIndex(images.length - 1);
                  console.log('l', i);
                } else {
                  console.log('set', i);
                  setIndex(i);
                }
              }
            }}
          >
            {images.map(image => (
              <GalleryImage objectFit='cover' key={image} src={image} />
            ))}
          </Gallery> */}
        </section>
        {books !== null && !loading ? (
          <section className='book-genres'>
            <div className='genre-1'>
              <div className='category'>
                <Link to='/'>
                  <img
                    src='https://i.imgur.com/nvRrI7r.png'
                    alt='Fantasy'
                    className='category-image'
                  />
                  <img
                    src={fantasyBookCover}
                    alt=''
                    className='category-book-cover'
                  />
                  <div className='icon'>
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='category-text name'>
                    <h1>Fantasy</h1>
                  </div>
                  <p>{fantasyBooks} knih</p>
                </Link>
              </div>
            </div>
            <div className='genre-2'>
              <div className='category'>
                <Link to='/'>
                  <img
                    src='https://i.imgur.com/iGICYWF.png'
                    alt='Thriller'
                    className='category-image'
                  />
                  <img
                    src='https://www.databazeknih.cz/images_books/36_/3658/bmid_muzi-kteri-nenavidi-zeny-kxn-3658.jpg'
                    alt='Muži, kteří nenávidí ženy'
                    className='category-book-cover'
                  />
                  <div className='icon'>
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='category-text name'>
                    <h1>Thriller</h1>
                  </div>
                  <p>{thrillerBooks} knih</p>
                </Link>
              </div>
            </div>
            <div className='genre-3'>
              <div className='category'>
                <Link to='/'>
                  <img
                    src='https://i.imgur.com/mzjomrz.png'
                    alt='Sci-fi'
                    className='category-image'
                  />
                  <img
                    src='https://www.databazeknih.cz/images_books/11_/119273/bmid_ready-player-one-AXq-119273.jpg'
                    alt='Ready player one - Hra začíná'
                    className='category-book-cover'
                  />
                  <div className='icon'>
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='category-text name'>
                    <h1>Sci-fi</h1>
                  </div>
                  <p>{scifiBooks} knih</p>
                </Link>
              </div>
            </div>
            <div className='genre-4'>
              <div className='category'>
                <Link to='/books'>
                  <img
                    src='https://i.imgur.com/5Hubnku.png'
                    alt='Show All'
                    className='category-image'
                  />
                  <div className='icon'>
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                    <i
                      className='far fa-caret-square-right'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='category-text name'>
                    <h1>Zobrazit vše</h1>
                  </div>
                  <p>{books.length} knih</p>
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <h1>Načítám knihy...</h1>
        )}
      </div>
      {/* <News /> */}
      {pageSection('Novinky', 'icon fas fa-newspaper', '/news')}
      {/* <Popular /> */}
      {pageSection('Populární', 'icon fas fa-star', '/popular')}
      {/* <BooksJustRead /> */}
      {pageSection('10 právě čtených knih', 'icon fas fa-book-reader', '')}
    </div>
  );
};

export default HomePage;
