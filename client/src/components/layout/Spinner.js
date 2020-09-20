import React from 'react';

import './Spinner.css';

const Spinner = () => {
  return (
    <div className='spinner'>
      <div className='book-spinner-bg book-spinner'>
        <div className='book-spinner-page'></div>
        <div className='book-spinner-page'></div>
        <div className='book-spinner-page'></div>
      </div>
      <h1>Čtení</h1>
      {/* <h1>Reading</h1> */}
    </div>
  );
};

export default Spinner;
