import React, { useReducer } from 'react';
import axios from 'axios';

import AuthorContext from './authorContext';
import authorReducer from './authorReducer';

import {
  GET_AUTHORS,
  CLEAR_AUTHOR_ERRORS,
  GET_AUTHOR,
  CLEAR_AUTHOR,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  UPDATE_AUTHOR,
  SET_AUTHOR_FAVOURITE,
  CLEAR_AUTHOR_FAVOURITE,
  FILTER_AUTHORS,
  CLEAR_AUTHORS_FILTER,
  AUTHOR_ERROR
} from '../types';

const AuthorState = props => {
  const initialState = {
    authors: null,
    author: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(authorReducer, initialState);

  // Get Authors
  const getAuthors = async () => {
    try {
      const res = await axios.get('/api/authors');

      dispatch({
        type: GET_AUTHORS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTHOR_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Clear Author Errors
  const clearAuthorErrors = () => dispatch({ type: CLEAR_AUTHOR_ERRORS });

  // Get Author
  const getAuthor = async urlAuthorName => {
    try {
      const res = await axios.get(`/api/authors/${urlAuthorName}`);

      dispatch({
        type: GET_AUTHOR,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTHOR_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Clear Author
  const clearAuthor = () => dispatch({ type: CLEAR_AUTHOR });

  // Add Author
  const addAuthor = async authorData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/authors', authorData, config);

      dispatch({
        type: ADD_AUTHOR,
        payload: res.data
      });

      getAuthors();
    } catch (err) {
      dispatch({
        type: AUTHOR_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Delete Author
  const deleteAuthor = id => {
    dispatch({ type: DELETE_AUTHOR, payload: id });
  };

  // Update Author

  // Set Author to Favourite

  // Clear Favourite Author

  // Filter Authors
  const filterAuthors = text => {
    dispatch({ type: FILTER_AUTHORS, payload: text });
  };

  // Clear Authors Filter
  const clearAuthorsFilter = () => {
    dispatch({ type: CLEAR_AUTHORS_FILTER });
  };

  return (
    <AuthorContext.Provider
      value={{
        authors: state.authors,
        author: state.author,
        filtered: state.filtered,
        error: state.error,
        getAuthors,
        clearAuthorErrors,
        getAuthor,
        clearAuthor,
        addAuthor,
        deleteAuthor,
        filterAuthors,
        clearAuthorsFilter
      }}
    >
      {props.children}
    </AuthorContext.Provider>
  );
};

export default AuthorState;
