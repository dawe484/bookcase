import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import AuthContext from '../../context/auth/authContext';

// import setAuthToken from '../../utils/setAuthToken';
import translate from '../../i18n/translate';

import './SignPage.css';

const SignInPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // if (email === '' || password === '') {
    //   setAlert('Invalid Credentials', 'danger');
    // } else {
    console.log('Login submit');
    //   signIn({
    //     email,
    //     password,
    //   });
    //   toggleCompleteModal();
    // }
  };

  return (
    <div className='our-main-container'>
      <div className='our-header'>
        <div className='our-container'>
          <span className='our-logo'>
            <Link to='/'>{translate('logo', { myLogo: 'bookcase' })}</Link>
            <span className='screen-reader-text'>
              {translate('logo', { myLogo: 'bookcase' })}
            </span>
          </span>
        </div>
      </div>
      <div className='our-sign-container'>
        <div className='our-sign-content'>
          <div className='our-sign-form-body'>
            <form onSubmit={onSubmit} className='our-sign-form'>
              <div className='our-sign-panel'>
                <h1>{translate('signin_services')}</h1>
                <div className='our-form-content'>
                  <div className='our-social-container'>
                    <Link to='' className='social'>
                      <i className='fab fa-facebook-square' />
                    </Link>
                    <Link to='' className='social'>
                      <i className='fab fa-google-plus-square' />
                    </Link>
                    <Link to='' className='social'>
                      <i className='fab fa-linkedin' />
                    </Link>
                    <Link to='' className='social'>
                      <i className='fab fa-twitter-square' />
                    </Link>
                  </div>
                  <span>{translate('use_email')}</span>
                  <div className='our-sign-input-field'>
                    <label>{translate('email')}</label>
                    <input
                      type='email'
                      name='email'
                      value={email}
                      onChange={onChange}
                      // required
                    />
                    <label>{translate('password')}</label>
                    <input
                      type='password'
                      name='password'
                      value={password}
                      onChange={onChange}
                      // required
                    />
                  </div>
                  <div className='our-forget-message'>
                    <Link to='' className=''>
                      {translate('forget_message')}
                    </Link>
                  </div>
                  <button
                    className='redBtn signBtn'
                    type='submit'
                    value='Sign In'
                  >
                    {translate('signin')}
                  </button>
                  <div className='our-sign-message'>
                    {translate('signup_message')}
                    <Link
                      to='/signup'
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {translate('signup_link')}
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
