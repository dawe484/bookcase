import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import SimpleBar from 'simplebar-react';

// import Headbox from './components/layout/Headbox';
// import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import IntroPage from './components/pages/IntroPage';
import NotFound from './components/pages/NotFoundPage';

// import Home from './components/pages/HomePage';
// import News from './components/pages/NewsPage';
// import Popular from './components/pages/PopularPage';
// import Books from './components/pages/BooksPage';
// import Book from './components/pages/BookPage';
// import Viewer from './components/pages/ViewerPage';
// import BookRating from './components/pages/BookRatingPage';
// import Authors from './components/pages/AuthorsPage';
// import Author from './components/pages/AuthorPage';
// import User from './components/pages/UserPage';
// import About from './components/pages/AboutPage';
// import Help from './components/pages/HelpPage';

// import AuthorState from './context/author/AuthorState';
// import BookState from './context/book/BookState';
// import AuthState from './context/auth/AuthState';
// import AlertState from './context/alert/AlertState';

// import PrivateRoute from './components/routing/PrivateRoute';

import 'simplebar/dist/simplebar.min.css';
import './App.css';

import { default as I18nProvider } from './i18n/provider';
import { LOCALES } from './i18n/locales';

// if (localStorage.token) {
//   const authContext = useContext(AuthContext);

//   setAuthToken(localStorage.token);
//   authContext.loadUser();
// }

const App = () => {
  let languageStoredInLocalStorage = localStorage.getItem('language');

  let [language, setLanguage] = useState(
    languageStoredInLocalStorage ? languageStoredInLocalStorage : LOCALES.CZECH
  );

  return (
    <I18nProvider locale={language}>
      {/* // <AuthState>
    //   <AlertState>
    //     <AuthorState>
    //       <BookState> */}
      <Router>
        <Fragment>
          {/* <SimpleBar style={{ height: window.innerHeight }}> */}
          {/* <Navbar /> */}
          {/* <Headbox /> */}
          <div className='main-content'>
            <Switch>
              <Route exact path='/' component={IntroPage} />
              {/* <Route exact path='/' component={Home} /> */}
              {/* <Route exact path='/news' component={News} />
                        <Route exact path='/popular' component={Popular} />
                        <Route exact path='/books' component={Books} />
                        <Route exact path='/books/:urlTitle' component={Book} />
                        <Route
                        exact
                        path='/books/:urlTitle/viewer'
                        component={Viewer}
                      /> */}
              {/* <Route exact path='/book-rating/:urlTitle' component={BookRating} /> */}
              {/* <Route exact path='/authors' component={Authors} /> */}
              {/* <Route
                          exact
                          path='/authors/:urlAuthorName'
                          component={Author}
                          />
                          <PrivateRoute
                          exact
                          path='/users/:name'
                          component={User}
                          />
                          <PrivateRoute
                          exact
                          path='/users/edit/:name'
                          component={User}
                          />
                          <Route exact path='/about' component={About} />
                        <Route exact path='/help' component={Help} /> */}
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer
            language={language}
            handleSetLanguage={(language) => {
              setLanguage(language);
              storeLanguageInLocalStorage(language);
            }}
          />
          {/* </SimpleBar> */}
        </Fragment>
      </Router>
      {/* //  </BookState>
    //     </AuthorState>
    //   </AlertState>
    // </AuthState> */}
    </I18nProvider>
  );
};

function storeLanguageInLocalStorage(language) {
  localStorage.setItem('language', language);
}

export default App;
