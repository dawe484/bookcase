import React from 'react';
import { Link } from 'react-router-dom';

// import Spinner from '../layout/Spinner';
import translate from '../../i18n/translate';

import './IntroPage.css';

const IntroPage = () => {
  return (
    <div className='our-main-container'>
      <div className='our-header'>
        <div className='our-container'>
          <span className='our-logo'>
            {translate('logo', { myLogo: 'bookcase' })}
            <span className='screen-reader-text'>
              {translate('logo', { myLogo: 'bookcase' })}
            </span>
          </span>
          <Link to='/signin' className='authLink redBtn'>
            {translate('signin')}
          </Link>
        </div>
      </div>
      <div className='our-cards'>
        <div className='our-card our-card-background'>
          <div className='our-card-text-title our-card-text'>
            <h1 className='our-card-text-h1'>{translate('card_text_h1_00')}</h1>
            <h2 className='our-card-text-h2'>{translate('card_text_h2_00')}</h2>
            <div className='our-card-button'>
              <Link to='/' className='redBtn memberBtn'>
                {translate('card_membership')}
              </Link>
            </div>
          </div>
        </div>
        <div className='our-card center'>
          <div className='our-card-container'>
            <div className='our-card-text'>
              <h1 className='our-card-text-h1'>
                {translate('card_text_h1_01')}
              </h1>
              <h2 className='our-card-text-h2'>
                {translate('card_text_h2_01')}
              </h2>
            </div>
            <div className='our-card-img'>
              <img src='img/pages/intro_section_cz_01.jpg' alt='' id='img_01'/>
            </div>
          </div>
        </div>
        <div className='our-card center'>
          <div className='our-card-container reverse'>
            <div className='our-card-img darker-80'>
              <img src='img/pages/intro_section_cz_02.jpg' alt='' id='img_02'/>
            </div>
            <div className='our-card-text flipped'>
              <h1 className='our-card-text-h1'>
                {translate('card_text_h1_02')}
              </h1>
              <h2 className='our-card-text-h2'>
                {translate('card_text_h2_02')}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
