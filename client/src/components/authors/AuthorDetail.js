import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  createRef
} from 'react';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import Modali, { useModali } from 'modali';

import AuthContext from '../../context/auth/authContext';
import BookContext from '../../context/book/bookContext';
import AlertContext from '../../context/alert/alertContext';

import Alerts from '../layout/Alerts';

import BookItem from '../books/BookItem';
import BookFilter from '../books/BookFilter';

import { bookFormats } from '../pages/enums/bookFormats';
import { bookGenres } from '../pages/enums/bookGenres';
import { bookLanguages } from '../pages/enums/bookLanguages';
import { bookPublishers } from '../pages/enums/bookPublishers';
import { bookStatuses } from '../pages/enums/bookStatuses';

import './AuthorDetail.css';

const lang = 'cs';

const AuthorDetail = ({ authorData }) => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);

  const { isAuthenticated, user } = authContext;
  // const { error, clearBookErrors } = bookContext;
  // const { setAlert } = alertContext;

  // useEffect(() => {
  //   if (error === 'Book already exists') {
  //     setAlert(error, 'danger');
  //     toggleAlertModal();
  //     clearBookErrors();
  //   }

  //   // eslint-disable-next-line
  // }, [error]);

  const {
    _id,
    urlAuthorName,
    name,
    pseudonym,
    birthdate,
    deathdate,
    nationality,
    portrait,
    portraitAuthorName,
    resume,
    resumeSource,
    website,
    facebook,
    instagram,
    twitter
  } = authorData;

  let authorsBooks = authorData.book;
  const authorsAwards = authorData.award;

  let birth, death;
  if (birthdate) birth = birthdate.replace(/-/g, '. ');
  if (deathdate) death = deathdate.replace(/-/g, '. ');

  const [book, setBook] = useState({
    title: '',
    isbn: '',
    series: '',
    seriesNumber: '',
    formats: '',
    genres: '',
    language: '',
    pages: '',
    bookCover: '',
    bookCoverAuthor: '',
    ilustration: '',
    bookStatus: '',
    publishDate: '',
    publisher: '',
    originalTitle: '',
    translator: '',
    youtube: '',
    annotation: ''
  });

  const {
    title,
    isbn,
    series,
    seriesNumber,
    formats,
    genres,
    language,
    pages,
    bookCover,
    bookCoverAuthor,
    ilustration,
    bookStatus,
    publishDate,
    publisher,
    originalTitle,
    translator,
    youtube,
    annotation
  } = book;

  const onChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  const modalContainer = createRef();

  const [addBookModal, toggleAddBookModal] = useModali({
    animated: true
  });

  const [addAwardModal, toggleAddAwardModal] = useModali({
    animated: true
  });

  const [alertModal, toggleAlertModal] = useModali({
    animated: true,
    message: <Alerts />,
    onShow: () => setTimeout(toggleAlertModal, 2500)
  });

  const onFocusEnum = e => {
    let select = document.getElementById(e.target.name);

    if (!select.options.length) {
      let enumField;

      if (e.target.name === 'formats') enumField = bookFormats;
      if (e.target.name === 'genre1') enumField = bookGenres;
      if (e.target.name === 'genre2') enumField = bookGenres;
      if (e.target.name === 'language') enumField = bookLanguages;
      if (e.target.name === 'publisher') enumField = bookPublishers;
      if (e.target.name === 'bookStatus') enumField = bookStatuses;

      for (let element in enumField) {
        if (element === lang) {
          for (let i in enumField[element]) {
            let enumOption = enumField[element][i];
            let opt = document.createElement('option');
            opt.value = opt.text = opt.id = enumOption;
            select.appendChild(opt);
          }
        }
      }
    }
  };

  // function for dynamic sorting
  const compareValues = (key, order = 'asc') => {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    };
  };

  // const BookFilter = () => {
  //   const onChange = () => {
  //     let i = document.getElementById('selectOrder').options.selectedIndex;
  //     console.log(i);
  //     // if (i === 0) {
  //     //   authorsBooks = authorsBooks.sort(compareValues('date', 'desc'));
  //     //   handleSeriesClick();
  //     //   console.log(arr);
  //     //   // console.log(authorsBooks);
  //     //   setTimeout(() => {
  //     //     console.log('hi');
  //     //     handleBooksClick();
  //     //   }, 2000);
  //     // } else if (arr === 1) {
  //     //   authorsBooks = authorsBooks.sort(compareValues('date'));
  //     //   changeContent(seriesSection);
  //     //   console.log(arr);
  //     //   // console.log(authorsBooks);
  //     //   changeContent(booksSection);
  //     // }
  //   };

  //   return (
  //     <div className='item_search book'>
  //       <select name='order' id='selectOrder' onChange={onChange}>
  //         <option value='newToOld'>rok vydání (nejnovější)</option>
  //         <option value='oldToNew'>rok vydání (nejstarší)</option>
  //         <option value='aToZ'>A - Z (název knihy)</option>
  //         <option value='zToA'>Z - A (název knihy)</option>
  //       </select>
  //     </div>
  //   );
  // };

  const selectEnum = field => {
    if (document.getElementById(field).value === '') {
      return '';
    } else {
      let selector = document.getElementById(field);
      let value = selector[selector.selectedIndex].value;
      return document.getElementById(value).text;
    }
  };

  const formatsArray = () => {
    const arr = document.getElementById('formats').value.split(', ');
    return arr;
  };

  const onSubmit = async e => {
    e.preventDefault();

    let arr = [];
    if (selectEnum('genre2') !== '')
      arr.push(selectEnum('genre1'), selectEnum('genre2'));
    else arr.push(selectEnum('genre1'));

    book.formats = formatsArray();
    book.genres = arr;
    book.language = selectEnum('language');
    book.publisher = selectEnum('publisher');
    book.bookStatus = selectEnum('bookStatus');
    book.author = _id;
    bookContext.addBook(book, urlAuthorName);
    console.log(book);
    resetBook();
  };

  const resetBook = () => {
    toggleAddBookModal();
    setBook({
      title: '',
      isbn: '',
      series: '',
      seriesNumber: '',
      formats: '',
      genres: '',
      language: '',
      pages: '',
      bookCover: '',
      bookCoverAuthor: '',
      ilustration: '',
      bookStatus: '',
      publishDate: '',
      publisher: '',
      originalTitle: '',
      translator: '',
      youtube: '',
      annotation: ''
    });
  };

  // authorsBooks.sort((a, b) => (a.date < b.date ? 1 : -1));
  // console.log(authorsBooks.sort(compareValues('date')));
  // console.log(authorsBooks.sort(compareValues('title')));
  // authorsBooks.sort(compareValues('date', 'desc'));

  authorsBooks.sort(compareValues('publishDate', 'desc'));

  // const [bookOrderState, setBookOrderState] = useState({
  //   selectedOption: dateDesc
  // });

  // console.log(bookOrderState.selectedOption);

  // const onChangeBookOrder = selectedOption => {
  //   //   let arr = document.getElementById('selectOrder').options.selectedIndex;
  //   //   console.log(arr);
  //   //   setBookOrderState({ selectedOption }, () =>
  //   //     console.log('selected:', bookOrderState.selectedOption)
  //   //   );
  //   //   // console.log(booksSection);
  //   //   // setState({ content: booksSection });
  // };

  // const options = [
  //   { value: 'newToOld', label: 'rok vydání (nejnovější)' },
  //   { value: 'oldToNew', label: 'rok vydání (nejstarší)' },
  //   { value: 'aToZ', label: 'A - Z (název knihy)' },
  //   { value: 'zToA', label: 'Z - A (název knihy)' }
  // ];

  // const getSelectedOption = () => {
  //   let arr = document.getElementById('selectOrder').options.selectedIndex;
  //   console.log(arr);
  //   // setSelectedOption(arr);
  //   return arr;
  // };

  // const [selectedOption, setSelectedOption] = useState({
  //   selectedOptionOrder: 0
  // });

  // let i = 0;

  // const onChangeOrder = () => {
  // changeOrder(getSelectedOption());
  // setSelectedOption(e.target.value);
  // let arr = document.getElementById('selectOrder').selectedIndex;
  // console.log(arr);
  // let x = document.getElementById('selectOrder');
  // i = x.selectedIndex;
  // console.log(i);
  // setSelectedOption({ selectedOptionOrder: i });
  // changeContent(booksSection);
  // if (i === 0) {
  //   authorsBooks = authorsBooks.sort(compareValues('date', 'desc'));
  //   authorsBooks.map(book => {
  //     console.log(book.title);
  //     document.getElementById('items-list').innerHTML = book.title;
  //   });
  // } else if (i === 1) {
  //   if (authorsBooks !== 0) {
  //     authorsBooks = authorsBooks.sort(compareValues('date'));
  //     authorsBooks.map(book => {
  //       console.log(book.title);
  //       document
  //         .getElementById('items-list')
  //         .append(<BookItem key={book._id} book={book} />);
  //     });
  //   } else console.log('Knihy nenalezeny');
  // } else if (i === 2) {
  //   authorsBooks = authorsBooks.sort(compareValues('title'));
  //   authorsBooks.map(book => {
  //     console.log(book.title);
  //   });
  // } else if (i === 3) {
  //   authorsBooks = authorsBooks.sort(compareValues('title', 'desc'));
  //   authorsBooks.map(book => {
  //     console.log(book.title);
  //   });
  // }
  // document.getElementById('items-list').innerHTML = x.options[i].text;
  // console.log(authorsBooks);
  // return i;
  // };

  const addLink = (modal, buttonText) => (
    <Fragment>
      {buttonText === 'Přidat knihu' && <BookFilter />}
      {/* <div className='item_search book'>
        <select
          // value={selectedOption.selectedOptionOrder}
          onChange={onChangeOrder}
          id='selectOrder'
        >
          {options.map(o => (
            <option value={o.value} key={o.value}>
              {o.label}
            </option>
          ))}
        </select> */}
      {/* <select name='order' id='selectOrder' onChange={onChangeBookOrder}>
          <option value='newToOld'>rok vydání (nejnovější)</option>
          <option value='oldToNew'>rok vydání (nejstarší)</option>
          <option value='aToZ'>A - Z (název knihy)</option>
          <option value='zToA'>Z - A (název knihy)</option>
        </select> */}
      {/* </div> */}
      <button className='btn btn-sm' onClick={modal}>
        {/* Add Book */}
        {buttonText}
      </button>
    </Fragment>
  );

  const booksSection =
    authorsBooks.length !== 0 ? (
      <Fragment>
        <div className='ubc-list-row'>
          <div className='list-title'>
            <i className='icon fas fa-book'></i>
            <h1>Knihy ({authorsBooks.length})</h1>
          </div>
          <div className='search-pos'>
            {isAuthenticated && user.role === 'superhero' ? (
              addLink(toggleAddBookModal, 'Přidat knihu')
            ) : (
              <BookFilter />
            )
            // :  null
            }
          </div>
        </div>
        <div className='ubc-header' id='ubc-header'>
          <div className='items-list' id='items-list'>
            {/* <h2>{selectedOption.selectedOptionOrder}</h2> */}
            {authorsBooks.length !== 0
              ? authorsBooks.map(book => (
                  <BookItem key={book._id} book={book} />
                ))
              : null}
          </div>
        </div>
      </Fragment>
    ) : null;

  let bookSeriesArr = [];

  const haveBookSeries = bookArr => {
    bookArr.map(
      book =>
        book.series !== '' &&
        book.series.length !== 0 &&
        bookSeriesArr.indexOf(book.series) === -1
          ? bookSeriesArr.push(book.series)
          : null
      // : console.log(`Knižní série ${book.series} již existuje`)
    );
  };

  haveBookSeries(authorsBooks);
  // console.log(bookSeriesArr);

  const seriesSection =
    authorsBooks.length !== 0 && bookSeriesArr.length !== 0 ? (
      <Fragment>
        <div className='ubc-list-row'>
          <div className='list-title'>
            <i className='icon fas fa-folder'></i>
            <h1>Série ({bookSeriesArr.length})</h1>
          </div>
        </div>
        <div className='ubc-header' id='ubc-header'>
          {bookSeriesArr.map(bookSeries => (
            // <Link to=''>
            <p key={bookSeriesArr.indexOf(bookSeries)}>{bookSeries}</p>
            // </Link>
          ))}
        </div>
      </Fragment>
    ) : null;

  const awardsSection =
    authorsAwards.length !== 0 ? (
      <Fragment>
        <div className='ubc-list-row'>
          <div className='list-title'>
            <i className='icon fas fa-trophy'></i>
            <h1>Ocenění ({authorsAwards.length})</h1>
          </div>
          <div className='search-pos'>
            {isAuthenticated &&
              user.role === 'superhero' &&
              addLink(toggleAddAwardModal, 'Přidat ocenění')}
          </div>
        </div>
        <div className='ubc-header' id='ubc-header'>
          {authorsAwards.map(award => (
            <p key={award._id}>
              {award.yearOfAward} – {award.awardTitle} ({award.awardCategory}) –{' '}
              {award.bookOfAward}
            </p>
          ))}
        </div>
      </Fragment>
    ) : null;

  const [state, setState] = useState({
    content: booksSection
  });

  const changeContent = newContent => setState({ content: newContent });

  const handleBooksClick = () => changeContent(booksSection);
  const handleSeriesClick = () => changeContent(seriesSection);
  const handleAwardsClick = () => changeContent(awardsSection);

  return (
    <div className='container'>
      <div className='author-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-pencil-alt' />
            <h1>{name}</h1>
          </div>
          {facebook || instagram || twitter || website ? (
            <div className='socials'>
              <ul>
                {facebook && (
                  <li>
                    <a
                      href={facebook}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <div className='social-icon'>
                        <i
                          className='fab fa-facebook-square'
                          aria-hidden='true'
                        ></i>
                        <i
                          className='fab fa-facebook-square'
                          aria-hidden='true'
                        ></i>
                      </div>
                    </a>
                  </li>
                )}
                {instagram && (
                  <li>
                    <a
                      href={instagram}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <div className='social-icon'>
                        <i className='fab fa-instagram' aria-hidden='true'></i>
                        <i className='fab fa-instagram' aria-hidden='true'></i>
                      </div>
                    </a>
                  </li>
                )}
                {twitter && (
                  <li>
                    <a href={twitter} target='_blank' rel='noopener noreferrer'>
                      <div className='social-icon'>
                        <i
                          className='fab fa-twitter-square'
                          aria-hidden='true'
                        ></i>
                        <i
                          className='fab fa-twitter-square'
                          aria-hidden='true'
                        ></i>
                      </div>
                    </a>
                  </li>
                )}
                {website && (
                  <li>
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                      <div className='social-icon'>
                        <i
                          className='fas fa-external-link-square-alt'
                          aria-hidden='true'
                        ></i>
                        <i
                          className='fas fa-external-link-square-alt'
                          aria-hidden='true'
                        ></i>
                      </div>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ) : null}
        </div>
        <section className='info'>
          <div className='author-top-section'>
            {portrait ? (
              <div className='avatar'>
                <img src={portrait} alt='' />
                {portraitAuthorName ? (
                  <div className='img-copyright'>© {portraitAuthorName}</div>
                ) : null}
              </div>
            ) : (
              <div className='avatar-fake'>
                <i className='far fa-file-image'></i>
                {/* <div className='img-copyright'>© {portraitAuthorName}</div> */}
              </div>
            )}
            <div className='author-profile'>
              <div className='author-header'>
                {pseudonym.length !== 0 &&
                  pseudonym.map(authorsPseudonym =>
                    pseudonym.length === 1 ? (
                      <span key={pseudonym.indexOf(authorsPseudonym)}>
                        <span>pseudonym: </span>
                        {authorsPseudonym}
                      </span>
                    ) : pseudonym.indexOf(authorsPseudonym) === 0 ? (
                      <span key={pseudonym.indexOf(authorsPseudonym)}>
                        <span>pseudonymy: </span>
                        {authorsPseudonym}
                      </span>
                    ) : (
                      <span key={pseudonym.indexOf(authorsPseudonym)}>
                        , {authorsPseudonym}
                      </span>
                    )
                  )}
                {nationality && (
                  <div>
                    <span>národnost: </span>
                    {nationality},&nbsp;{birthdate && birth}{' '}
                    {deathdate && <span>– {death} </span>}
                  </div>
                )}
              </div>
              <div className='author-header-divider'></div>
              {resume && (
                <div className='author-bio'>
                  <div className='author-resume'>
                    <ReadMoreReact
                      text={resume}
                      min='300'
                      ideal='800'
                      max='900'
                      readMoreText='Číst více'
                      readLessText='Číst méně'
                    />
                    {resumeSource && (
                      <div className='author-resume-source'>
                        Zdroj životopisu: {resumeSource}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className='ubc-header' id='ubc-header-test'>
            <div className='items-list'> */}
          {/* <h2>{selectedOption.selectedOptionOrder}</h2> */}
          {/* {authorsBooks.length !== 0
              ? authorsBooks.map(book => (
                  <BookItem key={book._id} book={book} />
                ))
              : null} */}
          {/* </div>
          </div> */}
          {authorsBooks.length !== 0 ||
          bookSeriesArr.length !== 0 ||
          authorsAwards.length !== 0 ? (
            <div className='user-bottom-section'>
              <div className='bottom-section-title'>
                <ul>
                  {authorsBooks.length !== 0 ? (
                    <li>
                      <div className='link' onClick={handleBooksClick}>
                        <div className='icon'>
                          <i className='fas fa-book' aria-hidden='true' />
                          <i className='fas fa-book' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Knihy'>Knihy</span>
                        </div>
                      </div>
                    </li>
                  ) : null}
                  {bookSeriesArr.length !== 0 ? (
                    <li>
                      <div className='link' onClick={handleSeriesClick}>
                        <div className='icon'>
                          <i className='fas fa-folder' aria-hidden='true' />
                          <i className='fas fa-folder' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Série'>Série</span>
                        </div>
                      </div>
                    </li>
                  ) : null}
                  {authorsAwards.length !== 0 ? (
                    <li>
                      <div className='link' onClick={handleAwardsClick}>
                        <div className='icon'>
                          <i className='fas fa-trophy' aria-hidden='true' />
                          <i className='fas fa-trophy' aria-hidden='true' />
                        </div>
                        <div className='name'>
                          <span data-text='Ocenění'>Ocenění</span>
                        </div>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className='user-books-carousel'>{state.content}</div>
            </div>
          ) : null}
        </section>
      </div>
      <div className='author-content'>
        <div className='author-content'></div>
      </div>
      <Modali.Modal {...addBookModal}>
        <div className='modal-container add-container' ref={modalContainer}>
          <div className='list-row add'>
            <div className='list-title'>
              <h1>Přidat knihu</h1>
            </div>
          </div>
          <form
            action='/upload'
            encType='multipart/form-data'
            onSubmit={onSubmit}
          >
            <div className='input-field addBook'>
              <input
                type='text'
                name='title'
                value={title}
                onChange={onChange}
                required
              />
              <label>Název knihy</label>
              <input
                type='text'
                name='bookCover'
                value={bookCover}
                onChange={onChange}
              />
              <label>Obálka knihy</label>
              <input
                type='text'
                name='isbn'
                value={isbn}
                onChange={onChange}
                pattern='([0-9]{2}-[0-9]{3}-[0-9]{4}-[0-9]{1})|([0-9]{3}-[0-9]{2}-[0-9]{4}-[0-9]{3}-[0-9]{1})|([0-9]{2}-[0-9]{2}-[0-9]{5}-([0-9]|X){1})'
                title='ISBN musí být ve formátu buď ISBN-10 (XX-XXX-XXXX-X), (XX-XX-XXXXX-X) nebo ISBN-13 (XXX-XX-XXXX-XXX-X)'
                required
              />
              <label>ISBN</label>
              <div className='picturefile'></div>
              <div className='input-field addBookSeries'>
                <input
                  type='text'
                  name='series'
                  value={series}
                  onChange={onChange}
                />
                <label>
                  Série
                  <span> (volitelný)</span>
                </label>
                <input
                  type='text'
                  name='seriesNumber'
                  value={seriesNumber}
                  onChange={onChange}
                />
                <label>
                  Díl
                  <span> (volitelný)</span>
                </label>
              </div>
              <input
                type='text'
                name='formats'
                id='formats'
                value={formats}
                onChange={onChange}
                title='Ve tvaru format1, format2, ...'
                required
              />
              <label>
                Formát
                {/* <span> (volitelný)</span> */}
              </label>
              <div className='input-field addBookGenre'>
                <select
                  className='genre'
                  name='genre1'
                  id='genre1'
                  onFocus={onFocusEnum}
                  required
                ></select>
                <label>
                  Žánr
                  {/* <span> (volitelný)</span> */}
                </label>
                <select
                  className='genre'
                  name='genre2'
                  id='genre2'
                  onFocus={onFocusEnum}
                ></select>
                <label>
                  Žánr
                  <span> (volitelný)</span>
                </label>
              </div>
              <select
                name='language'
                id='language'
                onFocus={onFocusEnum}
                required
              ></select>
              <label>Jazyk</label>
              <input
                type='text'
                name='bookCoverAuthor'
                value={bookCoverAuthor}
                onChange={onChange}
              />
              <label>
                Autor/ka obálky
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='pages'
                value={pages}
                onChange={onChange}
                required
              />
              <label>Počet stran</label>
              <input
                type='text'
                name='ilustration'
                value={ilustration}
                onChange={onChange}
              />
              <label>
                Ilustrace / Foto
                <span> (volitelný)</span>
              </label>
              <select
                name='bookStatus'
                id='bookStatus'
                onFocus={onFocusEnum}
                required
              ></select>
              <label>
                Stav knihy
                {/* <span> (volitelný)</span> */}
              </label>
              <input
                type='text'
                name='publishDate'
                value={publishDate}
                onChange={onChange}
                pattern='[0-9]{4}'
                title='Rok vydání musí být ve formátu RRRR'
              />
              <label>
                Rok vydání
                <span> (volitelný)</span>
              </label>
              <select
                name='publisher'
                id='publisher'
                onFocus={onFocusEnum}
              ></select>
              <label>
                Nakladatelství
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='originalTitle'
                value={originalTitle}
                onChange={onChange}
              />
              <label>
                Originální název knihy
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='translator'
                value={translator}
                onChange={onChange}
              />
              <label>
                Překlad
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='youtube'
                value={youtube}
                onChange={onChange}
              />
              <label>
                Upoutávka
                <span> (volitelný)</span>
              </label>
              <textarea
                className='trailer-textarea'
                name='annotation'
                value={annotation}
                onChange={onChange}
              />
              <label>
                Anotace (popis)
                <span> (volitelný)</span>
              </label>
            </div>
            <div className='list-row add'>
              <div className='list-button'>
                <button id='btn' className='btn' type='submit' value='Save'>
                  Uložit
                </button>
                <button
                  id='btn'
                  className='btn'
                  type='reset'
                  value='Cancel'
                  onClick={resetBook}
                >
                  Zrušit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modali.Modal>
      <Modali.Modal {...alertModal} />
    </div>
  );
};

export default AuthorDetail;
