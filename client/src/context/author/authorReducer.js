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

export default (state, action) => {
  switch (action.type) {
    case GET_AUTHORS:
      return {
        ...state,
        authors: action.payload,
        loading: false
      };
    case CLEAR_AUTHOR_ERRORS:
      return {
        ...state,
        error: null
      };
    case GET_AUTHOR:
      return {
        ...state,
        author: action.payload,
        loading: false
      };
    case CLEAR_AUTHOR:
      return {
        ...state,
        author: null
      };
    case ADD_AUTHOR:
      return {
        ...state,
        authors: [...state.authors, action.payload],
        loading: false
      };
    case UPDATE_AUTHOR:
      return {
        ...state,
        authors: state.authors.map(author =>
          author._id === action.payload._id ? action.payload : author
        ),
        loading: false
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter(author => author._id !== action.payload),
        loading: false
      };
    case FILTER_AUTHORS:
      return {
        ...state,
        filtered: state.authors.filter(author => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return author.name.match(regex);
        })
      };
    case CLEAR_AUTHORS_FILTER:
      return {
        ...state,
        filtered: null
      };
    case AUTHOR_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
