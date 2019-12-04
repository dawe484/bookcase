import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <ul>
          <li>
            <Link to='/news'>
              <div className='icon'>
                <i className="fas fa-newspaper" aria-hidden='true' />
                <i className="fas fa-newspaper" aria-hidden='true' />
              </div>
              <div className='name'>
                <span data-text='Novinky'>Novinky</span>
              </div>
            </Link> {/* knižní novinky - knihy, které vyšly */}
          </li>
          <li>
            <Link to='/popular'>
              <div className='icon'>
                <i className="fas fa-star" aria-hidden='true' />
                <i className="fas fa-star" aria-hidden='true' />
              </div>
              <div className='name'>
                <span data-text='Populární'>Populární</span>
              </div>
            </Link> {/* populární knihy, které uživatelé rádi čtou */}
          </li>
          {/* <li>
            <a href='/booksJustRead'>
              <div className='icon'>
                <i className='fas fa-book-reader' aria-hidden='true' />
                <i className='fas fa-book-reader' aria-hidden='true' />
              </div>
              <div className='name'>
                <span data-text='10 books just read (October)'>10 books just read (October)</span>
              </div>
            </a> 10 právě čtených knih uživately v daném měsíci
          </li> */}
          <li>
            <Link to='/books'>
              <div className='icon'>
                <i className="fas fa-book" aria-hidden='true' />
                <i className="fas fa-book" aria-hidden='true' />
              </div>
              <div className='name'>
                <span data-text='Knihy'>Knihy</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/authors'>
              <div className='icon'>
                <i className='fas fa-pencil-alt' aria-hidden='true' />
                <i className='fas fa-pencil-alt' aria-hidden='true' />
              </div>
              <div className='name'>
                <span data-text='Autoři'>Autoři</span>
              </div>
            </Link>
          </li>
        </ul>
        <ul>
        </ul>
      </div>
    </div>
  )
};

export default Navbar;
