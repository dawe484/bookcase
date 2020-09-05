import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import Rating from 'react-rating';

import AuthContext from '../../context/auth/authContext';

import './BookDetail.css';

const lang = 'cs';

const BookDetail = ({ bookData }) => {
  const {
    _id,
    urlTitle,
    title,
    isbn,
    series,
    seriesNumber,
    formats,
    genres,
    language,
    pages,
    bookCover,
    bookCoverAuthor,
    ilustration,
    bookStatus,
    yearOfPublication,
    publisher,
    originalTitle,
    yearOfPublicationOriginal,
    translator,
    youtube,
    annotation,
    rating,
    numberOfRatings,
    bookComments,
    bookEditions,
    date,
    author,
  } = bookData;

  console.log(bookData);

  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const annotationSection = annotation ? (
    <Fragment>
      <div className='ubc-list-row'>
        <div className='list-title'>
          <i className='icon fas fa-scroll'></i>
          <h1>Anotace</h1>
        </div>
      </div>
      <ReadMoreReact
        text={annotation}
        min={200}
        ideal={300}
        max={400}
        readMoreText='Číst více'
        readLessText='Číst méně'
      />
    </Fragment>
  ) : null;

  // const seriesSection = series ? (
  //   <Fragment>
  //     <div className='ubc-list-row'>
  //       <div className='list-title'>
  //         <i className='icon fas fa-folder'></i>
  //         <h1>Série</h1>
  //       </div>
  //     </div>
  //     <div className='ubc-header' id='ubc-header'>
  //       Další tituly ze série "{title}"
  //     </div>
  //   </Fragment>
  // ) : null;

  const commentsSection = bookComments ? (
    <Fragment>
      <div className='ubc-list-row'>
        <div className='list-title'>
          <i className='icon fas fa-book'></i>
          <h1>Komentáře</h1>
        </div>
        {/* <div className='search-pos'>
            {isAuthenticated && user.role === 'superhero' && addBookLink}
          </div> */}
      </div>
      <div className='ubc-header' id='ubc-header'>
        Komentáře ke knize
      </div>
    </Fragment>
  ) : null;

  const editionsSection = bookEditions ? (
    <Fragment>
      <div className='ubc-list-row'>
        <div className='list-title'>
          <i className='icon fas fa-language'></i>
          <h1>Cizojazyčná vydání</h1>
        </div>
      </div>
      <div className='ubc-header' id='ubc-header'>
        Jednotlivá cizojazyčná vydání knihy
      </div>
    </Fragment>
  ) : null;

  const trailerSection = youtube ? (
    <Fragment>
      <div className='ubc-list-row'>
        <div className='list-title'>
          <i className='icon fas fa-film'></i>
          <h1>Upoutávka</h1>
        </div>
      </div>
      <div className='ubc-header trailer' id='ubc-header'>
        <iframe
          width='800'
          height='450'
          src={youtube}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </Fragment>
  ) : null;

  const [state, setState] = useState({
    content: annotationSection,
  });

  const changeContent = (newContent) => setState({ content: newContent });

  const handleAnnotationClick = () => changeContent(annotationSection);
  // const handleSeriesClick = () => changeContent(seriesSection);
  const handleCommentsClick = () => changeContent(commentsSection);
  const handleEditionsClick = () => changeContent(editionsSection);
  const handleTrailerClick = () => changeContent(trailerSection);

  const extractArray = (arr, startIndex, endIndex) => {
    let newArr = [];
    for (let i = startIndex; i < endIndex; i++) {
      newArr.push(<span key={i}>, {arr[i]}</span>);
    }
    return newArr;
  };

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dateDiffInDays = (d1, d2) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    return days;
  };

  const [ratingState, setRatingState] = useState({
    value: 0,
  });

  const resetRatingClick = async () => {
    setRatingState({ value: 0 });
    // console.log(ratingState.value);
    // console.log(bookData._id);
    user.read.map((book) => {
      if (bookData._id === book.bookId) {
        // console.log(user.read.indexOf(book));
        // user.read.splice(user.read.indexOf(book), 1);
        user.read[user.read.indexOf(book)].bookRating = 0;
        console.log(user.read);
      }
    });
  };

  let obj = {
    bookId: bookData._id,
    bookRating: 0,
  };

  const addToRead = async (rating) => {
    // else
    //   for (let i = 0; i < user.read.length; i++) {
    //     if (user.read[i].bookId === bookData._id)
    //       user.read.splice(i, 1);
    //     else user.read.unshift(obj);
    //   }
    obj.bookRating = rating;
    if (user.read.length === 0) {
      if (!document.getElementById('readCheck').checked)
        document.getElementById('readCheck').checked = true;
      console.log(document.getElementById('readCheck').checked);
      readOnClick();
    } else {
      user.read.map((book) => {
        book.bookRating = rating;
        // console.log(book);
      });
    }
    console.log(user.read);
  };

  const readOnClick = async () => {
    if (user.read.length === 0) user.read.unshift(obj);
    else
      for (let i = 0; i < user.read.length; i++) {
        if (user.read[i].bookId === bookData._id) {
          user.read.splice(i, 1);
          resetRatingClick();
        } else user.read.unshift(obj);
      }

    // console.log(document.getElementById('readCheck').value);
    // authContext.updateUser(user);
    console.log(user.read);
  };

  const otherAuthorsBook = author ? (
    <Fragment>
      {author.book.map((book) =>
        book.rating >= 80 ? (
          book.title !== title ? (
            <p key={book._id}>
              <i
                className='fas fa-star'
                style={{ color: 'var(--danger-color)' }}
              />
              <a href={`/books/${book.urlTitle}`}>
                <span>
                  {book.title}&nbsp;({book.yearOfPublication})
                </span>
              </a>
            </p>
          ) : null
        ) : book.rating >= 40 && book.rating < 80 ? (
          book.title !== title ? (
            <p key={book._id}>
              <i
                className='fas fa-star'
                style={{ color: 'var(--neutral-color)' }}
              />
              <a href={`/books/${book.urlTitle}`}>
                <span>
                  {book.title}&nbsp;({book.yearOfPublication})
                </span>
              </a>
            </p>
          ) : null
        ) : book.rating > 0 && book.rating < 40 ? (
          book.title !== title ? (
            <p key={book._id}>
              <i
                className='fas fa-star'
                // style={{ color: 'var(--dark-color)' }}
              />
              <a href={`/books/${book.urlTitle}`}>
                <span>
                  {book.title}&nbsp;({book.yearOfPublication})
                </span>
              </a>
            </p>
          ) : null
        ) : book.rating === 0 && book.numberOfRatings > 0 ? (
          book.title !== title ? (
            <p key={book._id}>
              <i
                className='fas fa-star'
                style={{ color: 'var(--dark-color)' }}
              />
              <a href={`/books/${book.urlTitle}`}>
                <span>
                  {book.title}&nbsp;({book.yearOfPublication})
                </span>
              </a>
            </p>
          ) : null
        ) : book.title !== title ? (
          <p key={book._id}>
            <i
              className='far fa-star'
              // style={{ color: 'var(--dark-color)' }}
            />
            <a href={`/books/${book.urlTitle}`}>
              <span>
                {book.title}&nbsp;({book.yearOfPublication})
              </span>
            </a>
          </p>
        ) : null
      )}
    </Fragment>
  ) : null;

  return (
    <div className='container'>
      <div className='book-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-book' />
            <h1>{title}</h1>
          </div>
          {rating >= 80 ? (
            <div className='overall-rating'>
              <Link
                to={{
                  pathname: `/book-rating/${urlTitle}`,
                  urlTitle: urlTitle,
                }}
                className='btn-sm overall-rating-pro red'
                title='Bližší info k hodnocení'
              >
                {rating} %
              </Link>
              <div className='btn-sm overall-rating-no'>
                {numberOfRatings} hodnocení
              </div>
            </div>
          ) : rating >= 40 && rating < 80 ? (
            <div className='overall-rating'>
              <Link
                to={{
                  pathname: `/book-rating/${urlTitle}`,
                  urlTitle: urlTitle,
                }}
                className='btn-sm overall-rating-pro neutral'
                title='Bližší info k hodnocení'
              >
                {rating} %
              </Link>
              <div className='btn-sm overall-rating-no'>
                {numberOfRatings} hodnocení
              </div>
            </div>
          ) : rating > 0 && rating < 40 ? (
            <div className='overall-rating'>
              <Link
                to={{
                  pathname: `/book-rating/${urlTitle}`,
                  urlTitle: urlTitle,
                }}
                className='btn-sm overall-rating-pro dark'
                title='Bližší info k hodnocení'
              >
                {rating} %
              </Link>
              <div className='btn-sm overall-rating-no light'>
                {numberOfRatings} hodnocení
              </div>
            </div>
          ) : rating === 0 && numberOfRatings > 0 ? (
            <div className='overall-rating'>
              <Link
                to={{
                  pathname: `/book-rating/${urlTitle}`,
                  urlTitle: urlTitle,
                }}
                className='btn-sm overall-rating-pro dark'
                title='Bližší info k hodnocení'
              >
                {rating} %
              </Link>
              <Link
                to={{
                  pathname: `/book-rating/${urlTitle}`,
                  urlTitle: urlTitle,
                }}
                // className='btn-sm overall-rating-pro dark'
                title='Bližší info k hodnocení'
              >
                <div className='btn-sm overall-rating-no light'>
                  {numberOfRatings} hodnocení
                </div>
              </Link>
            </div>
          ) : (
            <div className='no-rating overall-rating-no'>nehodnoceno</div>
          )}
        </div>
        <div className='book-header'>
          <div className='author-name book-author'>
            kniha od&nbsp;
            <Link
              to={{
                pathname: `/authors/${author.urlAuthorName}`,
                state: { author },
              }}
              className=''
            >
              <span>{author.name}</span>
            </Link>
          </div>
          {user && (
            <div className='book-rating'>
              {ratingState.value !== 0 && (
                <span className='reset-rating'>
                  <button className='btn-sm' onClick={resetRatingClick}>
                    Zrušit
                  </button>
                </span>
              )}
              <span className='my-rating-text'>Mé hodnocení:</span>
              <Rating
                initialRating={ratingState.value}
                emptySymbol='fa fa-star-o'
                fullSymbol='fa fa-star'
                fractions={2}
                onChange={(rate) => {
                  console.log(rate);
                  setRatingState({ value: rate });
                  addToRead(rate);
                }}
              />
            </div>
          )}
        </div>
        <section className='info'>
          <div className='book-top-section'>
            <div className='avatar'>
              {bookCover ? (
                <img src={bookCover} alt='' />
              ) : (
                <div>No image found</div>
              )}
              {bookCover &&
              dateDiffInDays(new Date(bookData.date), new Date()) <= 30 ? (
                <div className='book-status-labels'>
                  <i
                    className='book-status-label bsl--new'
                    data-label='Novinka'
                  >
                    <span className='show'>N</span>
                    <span className='show'>ovinka</span>
                  </i>
                  {/* <i className='book-status-label bsl--popular' data-label='Popular'>
                    <span className='show'>P</span>
                    <span className='show'>opulární</span>
                  </i> */}
                </div>
              ) : null}
            </div>
            <div className='book-profile'>
              {/* <div className='author-header-divider'></div> */}
              <div className='author-bio'>
                <div className='book-detail'>
                  <table>
                    <tbody>
                      {series ? (
                        <tr>
                          <td>Série</td>
                          <td>
                            {series}{' '}
                            {series && seriesNumber && (
                              <span>({seriesNumber}. díl)</span>
                            )}
                          </td>
                        </tr>
                      ) : null}
                      {/* {series && seriesNumber
                        ? <tr>
                          <td>Číslo dílu</td>
                          <td>{seriesNumber}</td>
                        </tr>
                        : null
                      } */}
                      <tr>
                        <td>Žánr</td>
                        <td>
                          {genres[0]}
                          {genres[1] && extractArray(genres, 1, genres.length)}
                        </td>
                      </tr>
                      <tr>
                        <td>Počet stran</td>
                        <td>{pages}</td>
                      </tr>
                      {publisher && yearOfPublication ? (
                        <tr>
                          <td> Nakladatelství</td>
                          <td>
                            {publisher}, {yearOfPublication}
                          </td>
                        </tr>
                      ) : null}
                      {/* {bookStatus
                        ? <tr>
                          <td>Stav</td>
                          <td>{bookStatus}</td>
                        </tr>
                        : null
                      } */}
                      <tr>
                        <td>Jazyk vydání</td>
                        <td>{language}</td>
                      </tr>
                      <tr>
                        <td>Formát</td>
                        <td>
                          {formats[0]}
                          {formats[1] &&
                            extractArray(formats, 1, formats.length)}
                        </td>
                      </tr>
                      {bookCover && bookCoverAuthor ? (
                        <tr>
                          <td>Autor/ka obálky</td>
                          <td>{bookCoverAuthor}</td>
                        </tr>
                      ) : null}
                      {ilustration ? (
                        <tr>
                          <td>Ilustrace</td>
                          <td>{ilustration}</td>
                        </tr>
                      ) : null}
                      <tr>
                        <td>ISBN</td>
                        <td>{isbn}</td>
                      </tr>
                      {originalTitle ? (
                        <tr>
                          <td>Originální název</td>
                          <td>{originalTitle}</td>
                        </tr>
                      ) : null}
                      {translator ? (
                        <tr>
                          <td>Překlad</td>
                          <td>{translator}</td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='book-btn'>
                <div className='aside-btn-item'>
                  <Link
                    to={{
                      pathname: `/books/${urlTitle}/viewer`,
                    }}
                    className='btn'
                  >
                    Číst knihu
                  </Link>
                </div>
                <div className='aside-btn-item' id='addTo'>
                  <button className='btn'>Přidat do</button>
                  <div className='addTo-dropdown'>
                    <div className='addTo-dropdown-content'>
                      <input
                        type='checkbox'
                        id='readingCheck'
                        name='reading'
                        // value='reading'
                      />
                      <label htmlFor='readingCheck'>
                        <i></i>
                        <span>Právě čtu</span>
                      </label>
                      {/* <br /> */}
                      <input
                        type='checkbox'
                        id='readCheck'
                        name='read'
                        // value='read'
                        onClick={readOnClick}
                      />
                      <label htmlFor='readCheck'>
                        <i></i>
                        <span>Přečteno</span>
                      </label>
                      {/* <br /> */}
                      <input
                        type='checkbox'
                        id='goingToReadCheck'
                        name='goingToRead'
                        // value='goingToRead'
                      />
                      <label htmlFor='goingToReadCheck'>
                        <i></i>
                        <span>Chystám se číst</span>
                      </label>
                      {/* <br /> */}
                      <input
                        type='checkbox'
                        id='favouriteBookCheck'
                        name='favouriteBook'
                        // value='favouriteBook'
                      />
                      <label htmlFor='favouriteBookCheck'>
                        <i></i>
                        <span>Oblíbené</span>
                      </label>
                      {/* <br /> */}
                      <input
                        type='checkbox'
                        id='eBookcaseCheck'
                        name='eBookcase'
                        // value='eBookcase'
                      />
                      <label htmlFor='eBookcaseCheck'>
                        <i></i>
                        <span>E-knihotéka</span>
                      </label>
                      {/* <br /> */}
                      {/* <input
                        type='checkbox'
                        id='wantToBorrowCheck'
                        name='wantToBorrow'
                        // value='wantToBorrow'
                      />
                      <label htmlFor='wantToBorrowCheck'>
                        <i></i>
                        <span>Chci si půjčit</span>
                      </label>
                      <br /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {author.book.length > 1 && (
              <aside className='aside-column'>
                <div className='authors-books'>
                  <h1>Další knihy od autora/ky:</h1>
                  {author ? (
                    <div className='ab-p'>{otherAuthorsBook}</div>
                  ) : null}
                </div>
                <Link
                  to={{
                    pathname: `/authors/${author.urlAuthorName}`,
                    urlName: author.urlAuthorName,
                  }}
                  className='btn btn-sm btn-all'
                >
                  všech {author.book.length} knih autora/ky
                </Link>
                {/* <button className='btn btn-sm btn-all'>
                </button> */}
              </aside>
            )}
          </div>
          {annotation || series || bookComments || bookEditions || youtube ? (
            <div className='user-bottom-section'>
              <div className='bottom-section-title'>
                <ul>
                  {annotation ? (
                    <li>
                      <div className='link' onClick={handleAnnotationClick}>
                        <div className='icon'>
                          <i className='fas fa-scroll' aria-hidden='true' />
                          <i className='fas fa-scroll' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Anotace'>Anotace</span>
                        </div>
                      </div>
                    </li>
                  ) : null}
                  {/* {series ? (
                    <li>
                      <div className='link' onClick={handleSeriesClick}>
                        <div className='icon'>
                          <i className='fas fa-folder' aria-hidden='true' />
                          <i className='fas fa-folder' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Série'>Série</span>
                        </div>
                      </div>
                    </li>
                  ) : null} */}
                  {bookComments ? (
                    <li>
                      <div className='link' onClick={handleCommentsClick}>
                        <div className='icon'>
                          <i className='fas fa-book' aria-hidden='true' />
                          <i className='fas fa-book' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Komentáře'>Komentáře</span>
                        </div>
                      </div>
                    </li>
                  ) : null}
                  {bookEditions ? (
                    <li>
                      <div className='link' onClick={handleEditionsClick}>
                        <div className='icon'>
                          <i className='fas fa-language' aria-hidden='true' />
                          <i className='fas fa-language' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Cizojazyčná vydání'>
                            Cizojazyčná vydání
                          </span>
                        </div>
                      </div>
                    </li>
                  ) : null}
                  {youtube ? (
                    <li>
                      <div className='link' onClick={handleTrailerClick}>
                        <div className='icon'>
                          <i className='fas fa-film' aria-hidden='true' />
                          <i className='fas fa-film' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Upoutávka'>Upoutávka</span>
                        </div>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className='user-books-carousel'>{state.content}</div>
            </div>
          ) : null}
        </section>
      </div>
      <div className='author-content'>
        <div className='author-content'></div>
      </div>
    </div>
  );
};

export default BookDetail;
