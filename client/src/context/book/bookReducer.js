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
  BOOK_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case CLEAR_BOOK_ERRORS:
      return {
        ...state,
        error: null
      };
    case GET_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    case CLEAR_BOOK:
      return {
        ...state,
        book: null
      };
    case ADD_BOOK:
      return {
        ...state,
        // books: [...state.books, action.payload],
        loading: false
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book._id === action.payload._id ? action.payload : book
        ),
        loading: false
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload),
        loading: false
      };
    case FILTER_BOOKS:
      return {
        ...state,
        filtered: state.books.filter(book => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return book.title.match(regex);
        })
      };
    case CLEAR_BOOKS_FILTER:
      return {
        ...state,
        filtered: null
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
