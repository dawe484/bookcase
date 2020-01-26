import React, {
  createRef,
  useState,
  useContext,
  useEffect,
  Fragment
} from 'react';
import { Link } from 'react-router-dom';
import Modali, { useModali } from 'modali';
import Alerts from '../../components/layout/Alerts';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import setAuthToken from '../../utils/setAuthToken';

import './Headbox.css';

const Headbox = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    signUp,
    signIn,
    error,
    clearErrors,
    isAuthenticated,
    signOut,
    user
  } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      authContext.loadUser();
    }
    // authContext.loadUser();

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      toggleAlertModal();
      clearErrors();
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      toggleAlertModal();
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  const [userSignUp, setUserSignUp] = useState({
    signUpName: '',
    signUpEmail: '',
    signUpPassword: ''
  });

  const [userSignIn, setUserSignIn] = useState({
    signInEmail: '',
    signInPassword: ''
  });

  const { signUpName, signUpEmail, signUpPassword } = userSignUp;
  const { signInEmail, signInPassword } = userSignIn;

  const onSignUpChange = e =>
    setUserSignUp({ ...userSignUp, [e.target.name]: e.target.value });
  const onSignInChange = e =>
    setUserSignIn({ ...userSignIn, [e.target.name]: e.target.value });

  const onSignUpSubmit = e => {
    e.preventDefault();
    if (signUpName === '' || signUpEmail === '' || signUpPassword === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      // console.log('Register submit');
      signUp({
        signUpName,
        signUpEmail,
        signUpPassword
      });
      toggleCompleteModal();
    }
  };

  const onSignInSubmit = e => {
    e.preventDefault();
    if (signInEmail === '' || signInPassword === '') {
      setAlert('Invalid Credentials', 'danger');
    } else {
      // console.log('Login submit');
      signIn({
        signInEmail,
        signInPassword
      });
      toggleCompleteModal();
    }
  };

  const [alertModal, toggleAlertModal] = useModali({
    animated: true,
    message: <Alerts />,
    onShow: () => setTimeout(toggleAlertModal, 2500)
  });

  const [completeExample, toggleCompleteModal] = useModali({
    animated: true
  });

  const signUpButton = createRef();
  const signInButton = createRef();
  const modalContainer = createRef();

  const handleSignUp = () => {
    modalContainer.current.classList.add('right-panel-active');
  };

  const handleSignIn = () => {
    modalContainer.current.classList.remove('right-panel-active');
  };

  const onSignOut = () => {
    signOut();
  };

  const authLinks = (
    <Fragment>
      <li>
        <div className='messages-container'>
          <div className='message'>
            <Link to='' className='message-link'>
              <div className='icon'>
                <i className='fas fa-comment-alt' aria-hidden='true' />
                <i className='fas fa-comment-alt' aria-hidden='true' />
              </div>
              <span className='message-count'>0</span>
            </Link>
          </div>
        </div>
      </li>
      <li>
        <div className='notifications-container'>
          <div className='notification'>
            <Link to='' className='notification-link'>
              <div className='icon'>
                <i className='fas fa-bell' aria-hidden='true' />
                <i className='fas fa-bell' aria-hidden='true' />
              </div>
              <span className='notification-count'>0</span>
            </Link>
          </div>
        </div>
      </li>
      <li>
        <div className='account-container'>
          <div className='account-bar'>
            <img
              className='user-icon'
              src='https://avatar.leagueoflegends.com/eune/Lucciii.png'
              alt='user-icon'
            />
            <div className='user-name'>{user && user.name}</div>
            <div className='icon'>
              <i className='fas fa-angle-down' />
            </div>
          </div>
          {user && (
            <div className='account-dropdown'>
              <div className='account-dropdown-links'>
                <Link
                  to={{
                    pathname: `/account/${user.name}`
                  }}
                  className='account-link'
                >
                  <div className='icon'>
                    <i className='fas fa-id-card' aria-hidden='true' />
                    <i className='fas fa-id-card' aria-hidden='true' />
                  </div>
                  <div className='name'>
                    <span data-text='Můj účet'>Můj účet</span>
                    {/* <span data-text='My Account'>My Account</span> */}
                  </div>
                </Link>
                <Link to='/' className='account-link' onClick={onSignOut}>
                  <div className='icon'>
                    <i className='fas fa-sign-out-alt' aria-hidden='true' />
                    <i className='fas fa-sign-out-alt' aria-hidden='true' />
                  </div>
                  <div className='name'>
                    <span data-text='Odhlásit'>Odhlásit</span>
                    {/* <span data-text='Sign Out'>Sign Out</span> */}
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='' onClick={toggleCompleteModal}>
          <div className='icon'>
            <i className='fas fa-sign-in-alt' aria-hidden='true' />
            <i className='fas fa-sign-in-alt' aria-hidden='true' />
          </div>
          <div className='name'>
            <span data-text='Přihlásit'>Přihlásit</span>
            {/* <span data-text='Sign In'>Sign In</span> */}
          </div>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='headbox'>
      <div className='container'>
        <h1>
          <Link to='/'>
            <div className='icon'>
              <i className='fas fa-book' aria-hidden='true' />
              <i className='fas fa-book' aria-hidden='true' />
            </div>
            <div className='name'>
              <span data-text='e-knihovna'>e-knihovna</span>
              {/* <span data-text='e-bookshelf'>e-bookshelf</span> */}
            </div>
          </Link>
        </h1>
        <div className='item_search'>
          <input type='text' name='search' placeholder='Hledat...' />
          {/* <input type='text' name='search' placeholder='Search...' /> */}
          <button className='icon'>
            <i className='fas fa-search' />
          </button>
        </div>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        <Modali.Modal {...completeExample}>
          <div className='modal-container' ref={modalContainer}>
            <div className='modal-form-container modal-sign-up-container'>
              <form action='' onSubmit={onSignUpSubmit}>
                <h1>Vytvořit účet</h1>
                {/* <h1>Create Account</h1> */}
                <div className='modal-social-container'>
                  <Link to='' className='social'>
                    <i className='fab fa-facebook-f'></i>
                  </Link>
                  <Link to='' className='social'>
                    <i className='fab fa-google-plus-g'></i>
                  </Link>
                  <Link to='' className='social'>
                    <i className='fab fa-linkedin-in'></i>
                  </Link>
                </div>
                <span>nebo použijte svůj e-mail k registraci</span>
                {/* <span>or use your email for registration</span> */}
                <div className='input-field'>
                  <input
                    type='text'
                    name='signUpName'
                    value={signUpName}
                    onChange={onSignUpChange}
                    required
                  />
                  <label>Přezdívka</label>
                  {/* <label>Name</label> */}
                  <input
                    type='email'
                    name='signUpEmail'
                    value={signUpEmail}
                    onChange={onSignUpChange}
                    required
                  />
                  <label>E-mail</label>
                  {/* <label>Email</label> */}
                  <input
                    type='password'
                    name='signUpPassword'
                    value={signUpPassword}
                    onChange={onSignUpChange}
                    required
                    minLength='6'
                  />
                  <label>Heslo</label>
                  {/* <label>Password</label> */}
                </div>
                <button
                  className='btn'
                  type='submit'
                  value='Sign Up'
                  style={{ marginTop: '1rem' }}
                >
                  Registrovat
                </button>
                {/* <button className='btn' type='submit' value='Sign Up' style={{ marginTop: '1rem' }}>Sign Up</button> */}
              </form>
            </div>
            <div className='modal-form-container modal-sign-in-container'>
              <form action='' onSubmit={onSignInSubmit}>
                <h1>Přihlásit</h1>
                {/* <h1>Sign in</h1> */}
                <div className='modal-social-container'>
                  <Link to='' className='social'>
                    <i className='fab fa-facebook-f'></i>
                  </Link>
                  <Link to='' className='social'>
                    <i className='fab fa-google-plus-g'></i>
                  </Link>
                  <Link to='' className='social'>
                    <i className='fab fa-linkedin-in'></i>
                  </Link>
                </div>
                <span>nebo použijte svůj účet</span>
                {/* <span>or use your account</span> */}
                <div className='input-field'>
                  <input
                    type='email'
                    name='signInEmail'
                    value={signInEmail}
                    onChange={onSignInChange}
                    required
                  />
                  <label>E-mail</label>
                  {/* <label>Email</label> */}
                  <input
                    type='password'
                    name='signInPassword'
                    value={signInPassword}
                    onChange={onSignInChange}
                    required
                  />
                  <label>Heslo</label>
                  {/* <label>Password</label> */}
                </div>
                <Link to=''>Zapomněli jste heslo?</Link>
                {/* <Link to=''>Forgot your password?</Link> */}
                <button className='btn' type='submit' value='Sign In'>
                  Přihlásit
                </button>
                {/* <button className='btn' type='submit' value='Sign In'>Sign In</button> */}
              </form>
            </div>
            <div className='modal-overlay-container'>
              <div className='modal-overlay'>
                <div className='modal-overlay-panel modal-overlay-left'>
                  <h1>Vítejte zpět!</h1>
                  {/* <h1>Welcome Back!</h1> */}
                  <p>
                    Chcete-li s námi zůstat v kontaktu, přihlaste se pomocí
                    svých osobních údajů
                  </p>
                  {/* <p>To keep connected with us please login with your personal info</p> */}
                  <button
                    className='ghost'
                    id='signIn'
                    ref={signInButton}
                    onClick={handleSignIn}
                  >
                    Přihlásit
                  </button>
                  {/* <button className='ghost' id='signIn' ref={signInButton} onClick={handleSignIn}>Sign In</button> */}
                </div>
                <div className='modal-overlay-panel modal-overlay-right'>
                  <h1>Vítej příteli!</h1>
                  {/* <h1>Hello, Friend!</h1> */}
                  <p>Zadejte své osobní údaje a vydejte se na cestu s námi</p>
                  {/* <p>Enter your personal details and start journey with us</p> */}
                  <button
                    className='ghost'
                    id='signUp'
                    ref={signUpButton}
                    onClick={handleSignUp}
                  >
                    Registrovat
                  </button>
                  {/* <button className='ghost' id='signUp' ref={signUpButton} onClick={handleSignUp}>Sign Up</button> */}
                </div>
              </div>
            </div>
          </div>
        </Modali.Modal>
        <Modali.Modal {...alertModal} />
      </div>
    </div>
  );
};

export default Headbox;
