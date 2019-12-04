import React from 'react';

import Author from '../authors/Author';

import './AuthorPage.css';

const AuthorPage = ({ match }) => {
  return <Author urlAddress={match.params.urlAuthorName} />;
};

export default AuthorPage;
