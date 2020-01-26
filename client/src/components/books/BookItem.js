import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BookItem.css';

const BookItem = ({ book }) => {
  const { urlTitle, title, bookCover, annotation, author, date } = book;

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const dateDiffInDays = (d1, d2) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);

    return days;
  };

  return (
    <div className='book-item-sm'>
      <Link
        to={{
          pathname: `/books/${urlTitle}`,
          urlTitle: urlTitle
        }}
        className=''
      >
        <div className='book-card-sm'>
          {bookCover ? (
            <div className='book-c-sm_content'>
              <figure className='book-card-sm_image'>
                <img src={bookCover} alt='' />
              </figure>
              <div className='book-card-sm_content'>
                <div className='bc-sm-content_inner'>
                  {annotation ? (
                    <p>{annotation.substring(0, 120).concat('...')}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className='book-card-sm_no-image'>
              <i className='far fa-file-image'></i>
            </div>
          )}
          {bookCover ? (
            <div className='book-status-labels'>
              {dateDiffInDays(new Date(date), new Date()) <= 30 && (
                <i className='book-status-label bsl--new' data-label='Novinka'>
                  <span className='show'>N</span>
                  <span className='show'>ovinka</span>
                </i>
              )}
            </div>
          ) : null}
        </div>
      </Link>
      {/* <Link
        to={{
          pathname: `/books/${urlTitle}`,
          // state: { book }
          urlTitle: urlTitle
        }}
        className=''
      >
        <article className='book-card-sm'>
          <figure className='book-card-sm_image'>
            {bookCover ? (
              <img src={bookCover} alt={title} style={{ opacity: 1 }} />
            ) : (
              <div>
                <i className='far fa-file-image'></i>
              </div>
            )}
          </figure>
          <div className='book-card-sm_content'>
            {annotation ? (
              <div className='bc-sm-content_inner'>
                <p>{annotation.substring(0, 120).concat('...')}</p>
              </div>
            ) : (
              <i className='far fa-file-image'></i>
            )}
          </div>
        </article>
      </Link> */}
      <div className='book-spec'>
        <div className='line'></div>
        <Link
          to={{
            pathname: `/books/${urlTitle}`,
            urlTitle: urlTitle
          }}
          className=''
        >
          <h2>{title}</h2>
        </Link>
        <Link
          to={{
            pathname: `/authors/${author.urlAuthorName}`,
            urlName: author.urlAuthorName
          }}
          className=''
        >
          <span>{author.name}</span>
        </Link>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookItem;
