import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <div className='book-spinner-bg'>
      <div className="book-spinner">
        <div className="book-spinner-page"></div>
        <div className="book-spinner-page"></div>
        <div className="book-spinner-page"></div>
      </div>
    </div>
  );
};

export default Spinner;
