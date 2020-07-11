import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='container'>
      <div className='books-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-exclamation-circle' aria-hidden='true' />
            <h1>404 Not Found</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
