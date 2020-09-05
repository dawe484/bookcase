import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

import Spinner from '../layout/Spinner';

import './UserPage.css';

const UserPage = () => {
  const authContext = useContext(AuthContext);

  const { user, loading } = authContext;

  const formatDate = (date) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const arr = date.split('-');

    return `${arr[0]}. ${arr[1]}. ${arr[2]}`;
  };

  const bday = user.birthdate && formatDate(user.birthdate);

  return (
    <div className='container'>
      <div className='user-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-id-card' />
            <h1>Můj účet</h1>
          </div>
        </div>
        {user !== null && !loading ? (
          <section className='info'>
            <div className='user-top-section'>
              <div className='avatar'>
                <img
                  src='https://cdn.albatrosmedia.cz/Images/Author/31462'
                  alt=''
                />
              </div>
              <div className='user-name'>
                <div className='user-header'>
                  <h1>{user.name}</h1>
                  <div className='socials'>
                    <ul>
                      <li>
                        <a
                          href={user.facebook}
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
                      <li>
                        <a
                          href={user.instagram}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <div className='social-icon'>
                            <i
                              className='fab fa-instagram'
                              aria-hidden='true'
                            ></i>
                            <i
                              className='fab fa-instagram'
                              aria-hidden='true'
                            ></i>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href={user.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
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
                    </ul>
                  </div>
                </div>
                <div className='user-bio'>
                  <div className='user-realname'>
                    {user.realName} {user.birthdate && bday}
                  </div>
                  <div className='user-statistics'>Statistics</div>
                </div>
              </div>
              <aside className='right-nav'>
                <ul>
                  <li>
                    <strong>Můj účet</strong>
                  </li>
                  <li>Hodnocení</li>
                  <li>Příspěvky</li>
                  <li>Oblíbení autoři</li>
                </ul>
              </aside>
            </div>
            <div className='user-bottom-section'>
              <div className='bottom-section-title'>
                <ul>
                  <li>
                    <div className='link'>
                      <div className='icon'>
                        <i className='fas fa-newspaper' aria-hidden='true' />
                        <i className='fas fa-newspaper' aria-hidden='true' />
                      </div>
                      <div className='name'>
                        <span data-text='Právě čtené'>Právě čtené</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='link'>
                      <div className='icon'>
                        <i className='fas fa-newspaper' aria-hidden='true' />
                        <i className='fas fa-newspaper' aria-hidden='true' />
                      </div>
                      <div className='name'>
                        <span data-text='Chystám se číst'>Chystám se číst</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='link'>
                      <div className='icon'>
                        <i className='fas fa-newspaper' aria-hidden='true' />
                        <i className='fas fa-newspaper' aria-hidden='true' />
                      </div>
                      <div className='name'>
                        <span data-text='Přečtené'>Přečtené</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='link'>
                      <div className='icon'>
                        <i className='fas fa-newspaper' aria-hidden='true' />
                        <i className='fas fa-newspaper' aria-hidden='true' />
                      </div>
                      <div className='name'>
                        <span data-text='Oblíbené'>Oblíbené</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='link'>
                      <div className='icon'>
                        <i className='fas fa-newspaper' aria-hidden='true' />
                        <i className='fas fa-newspaper' aria-hidden='true' />
                      </div>
                      <div className='name'>
                        <span data-text='E-knihotéka'>E-knihotéka</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='link'>
                      <div className='icon'>
                        <i className='fas fa-newspaper' aria-hidden='true' />
                        <i className='fas fa-newspaper' aria-hidden='true' />
                      </div>
                      <div className='name'>
                        <span data-text='Chci si půjčit'>Chci si půjčit</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='user-books-carousel'></div>
            </div>
            <div className='user-content'>
              <div className='user-content'></div>
            </div>
          </section>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default UserPage;
