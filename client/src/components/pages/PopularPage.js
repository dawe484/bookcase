import React from 'react';

const PopularPage = () => {
  return (
    <div className='container'>
      <div className='books-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-star' aria-hidden='true' />
            <h1>Populární knihy</h1>
          </div>
        </div>
        <div>Popular</div>
      </div>
    </div>
  );
};

export default PopularPage;
