import React, { Fragment, useContext, useEffect } from 'react';
import AuthorDetail from './AuthorDetail';

import AuthorContext from '../../context/author/authorContext';

const Author = data => {
  const authorContext = useContext(AuthorContext);

  const { author, getAuthor, loading } = authorContext;

  useEffect(() => {
    getAuthor(data.urlAddress);

    // eslint-disable-next-line
  }, []);

  // console.log(data);

  return (
    <Fragment>
      {author !== null && !loading ? (
        <AuthorDetail key={author._id} authorData={author} />
      ) : (
        <div className='container'>
          <div className='list-row'>
            <h1>Načítám autora...</h1>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Author;
