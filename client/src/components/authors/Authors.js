import React, { Fragment, useContext, useEffect } from 'react';
import AuthorItem from './AuthorItem';
import Spinner from '../layout/Spinner';

import AuthorContext from '../../context/author/authorContext';

const Authors = () => {
  const authorContext = useContext(AuthorContext);

  const {
    authors,
    filtered,
    getAuthors,
    loading,
    clearAuthor,
    clearAuthorsFilter,
  } = authorContext;

  useEffect(() => {
    clearAuthor();
    getAuthors();
    clearAuthorsFilter();

    // eslint-disable-next-line
  }, []);

  // console.log(authors);

  if (authors !== null && authors.length === 0 && !loading) {
    return <h4>Prosím přidejte autora</h4>;
  }

  return (
    <Fragment>
      {authors !== null && !loading ? (
        (filtered || authors).map((author) => (
          <AuthorItem key={author._id} author={author} />
        ))
      ) : (
        <h1>Načítám autory...</h1>
        // <Spinner />
      )}
    </Fragment>
  );
};

export default Authors;
