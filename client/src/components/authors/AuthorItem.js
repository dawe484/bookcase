import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './AuthorItem.css';

const AuthorItem = ({ author }) => {
  const { urlAuthorName, name, portrait } = author;

  return (
    <div className='author-item'>
      <Link
        to={{
          pathname: `/authors/${urlAuthorName}`,
          urlName: urlAuthorName
        }}
        className=''
      >
        <article className='author-card'>
          <figure className='author-card_image'>
            {portrait ? (
              <img src={portrait} alt='' />
            ) : (
              <i className='far fa-file-image'></i>
            )}
          </figure>
          <figure className='author-card_image2'>
            {portrait ? (
              <img src={portrait} alt='' style={{ opacity: 1 }} />
            ) : (
              <i className='far fa-file-image'></i>
            )}
          </figure>
        </article>
        <div className='author-name'>
          <div className='line'></div>
          <span>{name}</span>
        </div>
      </Link>
    </div>
  );
};

AuthorItem.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorItem;
