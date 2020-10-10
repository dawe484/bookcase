import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import AuthContext from '../../context/auth/authContext';

// import setAuthToken from '../../utils/setAuthToken';
import translate from '../../i18n/translate';

import './SignPage.css';

const SignUpPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // if (username === '' || email === '' || password === '') {
    //   setAlert('Please enter all fields', 'danger');
    // } else {
    console.log('Register submit');
    //   signUp({
    //     username,
    //     email,
    //     password,
    //   });
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
                <h1>{translate('signup')}</h1>
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
                    <label>{translate('username')}</label>
                    <input
                      type='text'
                      name='username'
                      value={username}
                      onChange={onChange}
                      // required
                    />
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
                  <div className='our-agreement'>
                    {translate('agreement')}
                    <Link to='' className='bold'>
                      {translate('terms_of_use_link')}
                    </Link>
                    {translate('and')}
                    <Link to='' className='bold'>
                      {translate('privacy_policy')}
                    </Link>
                  </div>
                  <button
                    className='redBtn signBtn'
                    type='submit'
                    value='Sign Up'
                  >
                    {translate('continue')}
                  </button>
                  <div className='our-sign-message'>
                    {translate('signin_message')}
                    <Link
                      to='/signin'
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {translate('signin')}
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

export default SignUpPage;
