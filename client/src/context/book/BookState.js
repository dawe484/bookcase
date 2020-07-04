import React, { useContext, useReducer } from 'react';
import axios from 'axios';

import BookContext from './bookContext';
import bookReducer from './bookReducer';

import AuthorContext from '../author/authorContext';

import {
  GET_BOOKS,
  CLEAR_BOOK_ERRORS,
  GET_BOOK,
  CLEAR_BOOK,
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  SET_READING,
  CLEAR_READING,
  FILTER_BOOKS,
  CLEAR_BOOKS_FILTER,
  BOOK_ERROR,
} from '../types';

const BookState = (props) => {
  const initialState = {
    books: null,
    book: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  const authorContext = useContext(AuthorContext);

  const { getAuthor } = authorContext;

  // Get Books
  const getBooks = async () => {
    try {
      const res = await axios.get('/api/books');

      dispatch({
        type: GET_BOOKS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Book Errors
  const clearBookErrors = () => dispatch({ type: CLEAR_BOOK_ERRORS });

  // Get Book
  const getBook = async (urlTitle) => {
    try {
      const res = await axios.get(`/api/books/${urlTitle}`);

      dispatch({
        type: GET_BOOK,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Author
  const clearBook = () => dispatch({ type: CLEAR_BOOK });

  // Add Book
  const addBook = async (bookData, urlAuthorAddress) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/books', bookData, config);

      // dispatch({
      //   type: ADD_BOOK,
      //   payload: res.data
      // });
      console.log(res.data);

      // getBooks();
      getAuthor(urlAuthorAddress);
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  // Delete Book
  const deleteBook = (id) => {
    dispatch({ type: DELETE_BOOK, payload: id });
  };

  // Update Book
  const updateBook = async (book) => {
    dispatch({ type: UPDATE_BOOK, payload: book });
  };

  // Set Book to Reading

  // Clear Reading Book

  // Filter Books
  const filterBooks = (text) => {
    dispatch({ type: FILTER_BOOKS, payload: text });
  };

  // Clear Books Filter
  const clearBooksFilter = () => {
    dispatch({ type: CLEAR_BOOKS_FILTER });
  };

  // Get Book Rating
  // const getBookRating = async urlTitle => {
  //   try {
  //     const res = await axios.get(`/api/book-rating/${urlTitle}`);

  //     dispatch({
  //       type: GET_BOOK,
  //       payload: res.data
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: BOOK_ERROR,
  //       payload: err.response.data.msg
  //     });
  //   }
  // };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        book: state.book,
        filtered: state.filtered,
        error: state.error,
        getBooks,
        clearBookErrors,
        getBook,
        clearBook,
        addBook,
        deleteBook,
        updateBook,
        filterBooks,
        clearBooksFilter,
        // getBookRating
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
