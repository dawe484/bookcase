import React, { useContext, useRef, useEffect } from 'react';
import BookContext from '../../context/book/bookContext';

const BooksFilter = () => {
  const bookContext = useContext(BookContext);
  const text = useRef(' ');

  const { filterBooks, clearBooksFilter, filtered } = bookContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterBooks(e.target.value);
    } else {
      clearBooksFilter();
    }
  };

  return (
    <div className='item_search'>
      <input
        ref={text}
        type='text'
        name='search'
        placeholder='Vyhledání knihy'
        onChange={onChange}
      />
    </div>
  );
};

export default BooksFilter;
