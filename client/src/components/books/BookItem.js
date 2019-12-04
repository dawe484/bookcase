import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BookItem.css';

const BookItem = ({ book }) => {
  const { urlTitle, title, bookCover, annotation, author } = book;

  return (
    <div className='book-item-sm'>
      <Link
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
      </Link>
      <div className='book-spec'>
        <div className='line'></div>
        <Link
          to={{
            pathname: `/books/${urlTitle}`,
            // state: { book }
            urlTitle: urlTitle
          }}
          className=''
        >
          <h2>{title}</h2>
        </Link>
        <Link
          to={{
            pathname: `/authors/${author.urlAuthorName}`,
            // state: { author }
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
