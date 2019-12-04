import React, { useContext, useRef, useEffect } from 'react';
import AuthorContext from '../../context/author/authorContext';

const AuthorsFilter = () => {
  const authorContext = useContext(AuthorContext);
  const text = useRef(' ');
  
  const { filterAuthors, clearAuthorsFilter, filtered } = authorContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterAuthors(e.target.value);
    } else {
      clearAuthorsFilter();
    }
  };

  return (
    <div className='item_search'>
      <input ref={text} type='text' name='search' placeholder='Vyhledání autora' onChange={onChange} />
    </div>
  )
};

export default AuthorsFilter;
