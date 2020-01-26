import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import Headbox from './components/layout/Headbox';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './components/pages/HomePage';
import News from './components/pages/NewsPage';
import Popular from './components/pages/PopularPage';
import Books from './components/pages/BooksPage';
import Book from './components/pages/BookPage';
// import BookRating from './components/pages/BookRatingPage';
import Authors from './components/pages/AuthorsPage';
import Author from './components/pages/AuthorPage';
import Account from './components/pages/UserPage';
import About from './components/pages/AboutPage';
import Help from './components/pages/HelpPage';
import NotFound from './components/pages/NotFoundPage';

import AuthorState from './context/author/AuthorState';
import BookState from './context/book/BookState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import PrivateRoute from './components/routing/PrivateRoute';

import 'simplebar/dist/simplebar.min.css';
import './App.css';

// if (localStorage.token) {
//   const authContext = useContext(AuthContext);

//   setAuthToken(localStorage.token);
//   authContext.loadUser();
// }

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <AuthorState>
          <BookState>
            <Router>
              <Fragment>
                <SimpleBar style={{ height: window.innerHeight }}>
                  <Navbar />
                  <Headbox />
                  <div className='main-content'>
                    <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/news' component={News} />
                      <Route exact path='/popular' component={Popular} />
                      <Route exact path='/books' component={Books} />
                      <Route exact path='/books/:urlTitle' component={Book} />
                      {/* <Route exact path='/book-rating/:urlTitle' component={BookRating} /> */}
                      <Route exact path='/authors' component={Authors} />
                      <Route exact path='/authors/:urlAuthorName' component={Author} />
                      <PrivateRoute exact path='/account/:name' component={Account} />
                      <PrivateRoute exact path='/account/edit/:name' component={Account} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/help' component={Help} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                  <Footer />
                </SimpleBar>
              </Fragment>
            </Router>
          </BookState>
        </AuthorState>
      </AlertState>
    </AuthState>
  );
};

export default App;
