import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className='footer'>
        <div className='container'>
          <div className='footer_top'>
            <ul>
              <li>
                <Link to='/about'>
                  <div className='icon'>
                    <i className="fas fa-info-circle" aria-hidden='true' />
                    <i className="fas fa-info-circle" aria-hidden='true' />
                  </div>
                  <div className='name'>
                    <span data-text='O nás'>O nás</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/help'>
                  <div className='icon'>
                    <i className="fas fa-question-circle" aria-hidden='true' />
                    <i className="fas fa-question-circle" aria-hidden='true' />
                  </div>
                  <div className='name'>
                    <span data-text='Nápověda'>Nápověda</span>
                  </div>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to=''>
                  <div className='social-icon'>
                    <i className='fab fa-facebook' aria-hidden='true' />
                    <i className='fab fa-facebook' aria-hidden='true' />
                  </div>
                </Link>
              </li>
              <li>
                <Link to=''>
                  <div className='social-icon'>
                    <i className='fab fa-instagram' aria-hidden='true' />
                    <i className='fab fa-instagram' aria-hidden='true' />
                  </div>
                </Link>
              </li>
              <li>
                <Link to=''>
                  <div className='social-icon'>
                    <i className='fab fa-twitter' aria-hidden='true' />
                    <i className='fab fa-twitter' aria-hidden='true' />
                  </div>
                </Link>
              </li>
              <li>
                <Link to=''>
                  <div className='social-icon'>
                    <i className='fab fa-youtube' aria-hidden='true' />
                    <i className='fab fa-youtube' aria-hidden='true' />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className='footer_bottom'>
            <h1>
              <div className='icon'>
                <i className='fas fa-book' aria-hidden='true' />
              </div>
              <div className='name'>
                <span data-text='e-knihovna'>e-knihovna</span>
              </div>
            </h1>
            <ul>
              <li>
                <p>2019 © e-knihovna</p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
};

export default Footer;
