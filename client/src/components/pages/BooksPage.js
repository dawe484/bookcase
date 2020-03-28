import React from 'react';

import Books from '../books/Books';
import BooksFilter from '../../components/books/BooksFilter';

import './BooksPage.css';

const lang = 'cs';

const BooksPage = () => {
  return (
    <div className='container'>
      <div className='books-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-book' aria-hidden='true' />
            {/* <h1>Books</h1> */}
            <h1>Knihy</h1>
          </div>
          <div className='search-pos'>
            <BooksFilter />
          </div>
        </div>
        <div className='books-divider'>
          <aside className='category-aside'>
            {/* <nav className='category-nav'>
              <h2>Selection by Category</h2>
              <ul>
                <li>
                  <a href='/'>Arts & Photography</a>
                </li>
                <li>
                  <a href='/'>Biographies & Memoirs</a>
                </li>
                <li>
                  <a href='/'>Business & Money</a>
                </li>
                <li>
                  <a href='/'>Calendars</a>
                </li>
                <li>
                  <a href='/'>Children's Books</a>
                </li>
                <li>
                  <a href='/'>Christian Books & Bibles</a>
                </li>
                <li>
                  <a href='/'>Comics & Graphic Novels</a>
                </li>
                <li>
                  <a href='/'>Computers & Technology</a>
                </li>
                <li>
                  <a href='/'>Cookbooks, Food & Wine</a>
                </li>
                <li>
                  <a href='/'>Crafts, Hobbies & Home</a>
                </li>
                <li>
                  <a href='/'>Education & Teaching</a>
                </li>
                <li>
                  <a href='/'>Engineering & Transportation</a>
                </li>
                <li>
                  <a href='/'>Fantasy</a>
                </li>
                <li>
                  <a href='/'>Health, Fitness & Dieting</a>
                </li>
                <li>
                  <a href='/'>History</a>
                </li>
                <li>
                  <a href='/'>Humor & Entertainment</a>
                </li>
                <li>
                  <a href='/'>Law</a>
                </li>
                <li>
                  <a href='/'>Lesbian, Gay, Bisexual & Transgender Books</a>
                </li>
                <li>
                  <a href='/'>Literature & Fiction</a>
                </li>
                <li>
                  <a href='/'>Medical Books</a>
                </li>
                <li>
                  <a href='/'>Mystery, Thriller & Suspense</a>
                </li>
                <li>
                  <a href='/'>Parenting & Relationships</a>
                </li>
                <li>
                  <a href='/'>Politics & Social Sciences</a>
                </li>
                <li>
                  <a href='/'>Reference</a>
                </li>
                <li>
                  <a href='/'>Religion & Spirituality</a>
                </li>
                <li>
                  <a href='/'>Romance</a>
                </li>
                <li>
                  <a href='/'>Science & Math</a>
                </li>
                <li>
                  <a href='/'>Science Fiction (Sci-fi)</a>
                </li>
                <li>
                  <a href='/'>Self-Help</a>
                </li>
                <li>
                  <a href='/'>Sports & Outdoors</a>
                </li>
                <li>
                  <a href='/'>Teen & Young Adult</a>
                </li>
                <li>
                  <a href='/'>Test Preparation</a>
                </li>
                <li>
                  <a href='/'>Travel</a>
                </li>
              </ul>
            </nav> */}
          </aside>
          <div className='books-origin'>
            <div className='items-list'>
              <Books />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
