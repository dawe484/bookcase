import React from 'react';
import { Link } from 'react-router-dom';

import translate from '../../i18n/translate';

import './Footer.css';

const Footer = (props) => {
  let selected, optionsContainer;

  return (
    <div>
      <footer className='our-footer'>
        <div className='our-footer-container'>
          <div className='our-footer-row'>
            <Link to='/' className='linkBtn upper'>
              {translate('help')}
            </Link>
            <Link to='/' className='linkBtn upper'>
              {translate('about')}
            </Link>
            <Link to='/' className='linkBtn upper'>
              {translate('jobs')}
            </Link>
            <Link to='/' className='linkBtn upper'>
              {translate('press')}
            </Link>
            <Link to='/' className='linkBtn upper'>
              {translate('contact_us')}
            </Link>
          </div>
          <div className='our-footer-row'>
            <Link to='/' className='linkBtn small'>
              {translate('terms_of_use')}
            </Link>
            <Link to='/' className='linkBtn small'>
              {translate('privacy')}
            </Link>
            <Link to='/' className='linkBtn small'>
              {translate('privacy_cookies')}
            </Link>
            <Link to='/' className='linkBtn small'>
              {translate('sitemap')}
            </Link>
          </div>
          <div className='our-footer-row our-socials'>
            <div className='our-footer-social'>
              <Link to='/'>
                <i className='fab fa-facebook-f' aria-hidden='true' />
              </Link>
              <Link to='/'>
                <i className='fab fa-twitter' aria-hidden='true' />
              </Link>
              <Link to='/'>
                <i className='fab fa-youtube' aria-hidden='true' />
              </Link>
              <Link to='/'>
                <i className='fab fa-instagram' aria-hidden='true' />
              </Link>
            </div>
            <p className='our-footer-legal'>
              ©2020 bookcase. {translate('legal')}
            </p>
            <div></div>
            {/* <div className='our-lang'>
              <select
                className='our-select'
                value={props.language}
                id='laguage-select'
                onChange={(e) => {
                  props.handleSetLanguage(e.target.value);
                  // window.location.reload();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <option value='cs-CZ' data-lang='cs'>
                  Čeština
                </option>
                <option value='en-US' data-lang='en'>
                  English
                </option>
              </select>
              <span className='our-select-arrow'></span>
            </div> */}
          </div>
          <div className='our-footer-row end'>
            <div className='select-box'>
              <div className='options-container'>
                <div
                  className='option'
                  onClick={() => {
                    if (selected === undefined) window.location.reload();
                    selected.innerHTML = document.getElementById(
                      'czech'
                    ).innerHTML;
                    props.handleSetLanguage(
                      document.getElementById('czech').htmlFor
                    );
                    optionsContainer.classList.remove('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <input
                    type='radio'
                    className='radio'
                    id='cs-CZ'
                    value='Čeština'
                    name='category'
                  />
                  <label htmlFor='cs-CZ' id='czech'>
                    Čeština
                  </label>
                </div>
                <div
                  className='option'
                  onClick={() => {
                    if (selected === undefined) window.location.reload();
                    selected.innerHTML = document.getElementById(
                      'english'
                    ).innerHTML;
                    props.handleSetLanguage(
                      document.getElementById('english').htmlFor
                    );
                    optionsContainer.classList.remove('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <input
                    type='radio'
                    className='radio'
                    id='en-US'
                    value='English'
                    name='category'
                  />
                  <label htmlFor='en-US' id='english'>
                    English
                  </label>
                </div>
              </div>
              <div
                className='selected'
                id='selected'
                onClick={() => {
                  selected = document.querySelector('.selected');
                  optionsContainer = document.querySelector(
                    '.options-container'
                  );
                  optionsContainer.classList.toggle('active');
                }}
              >
                {props.language === 'cs-CZ'
                  ? 'Čeština'
                  : props.language === 'en-US'
                  ? 'English'
                  : null}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
