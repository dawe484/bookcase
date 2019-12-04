import React from 'react';

import item from './booksJustRead.json';

const BooksJustRead = () => {
  const { sectionIcon, sectionTitle } = item;

  return (
    <div className='homepage-list-container'>
      <div className='list-row'>
        <div className='list-title'>
          <i className={sectionIcon} aria-hidden='true' />
          <h1>{sectionTitle}</h1>
        </div>
        <div>
          <a href="/" className='btn'>Show all</a>
        </div>
      </div>
      <div className='homepage-list-news'>
        <div className='book-item'>
          <article className='book-card'>
            <figure className='book-card_image'>
              <a href='/'>
                <img src='https://cdn.albatrosmedia.cz/Images/Product/33855998/?width=180&ts=636930727656670000' alt='Království popela' style={{ opacity: 1 }} />
              </a>
            </figure>
            <div className='book-card_content'>
              <div className='bc-content_inner'>
                <h2>
                  <a href='/'>Království popela</a>
                </h2>
                <div className='bc-content_author'>
                  <span>
                    <a href="/" className='author'>Sarah J. Maasová</a>
                  </span>
                </div>
                <p>
                  Aelin riskovala vše, aby zachránila svůj lid a ty, které miluje. Zaplatila za to strašlivou cenu a t...
                </p>
                {/* <div>
                  <a href='/' className='btn-sm'>Read More</a>
                </div> */}
              </div>
            </div>
          </article>
          <div className='add-to'>
            <a href='/' className='btn-sm'>
              <i className='far fa-plus-square' />
              <span>Add to</span>
            </a>
          </div>
        </div>
        <div className='book-item'>
          <article className='book-card'>
            <figure className='book-card_image'>
              <a href='/'>
                <img src='https://cdn.albatrosmedia.cz/Images/Product/55202829/?width=180&ts=636988148566500000' alt='Vojtěch Bernatský: Dvojtáta' style={{ opacity: 1 }} />
              </a>
            </figure>
            <div className='book-card_content'>
              <div className='bc-content_inner'>
                <h2>
                  <a href='/'>Vojtěch Bernatský: Dvojtáta</a>
                </h2>
                <div className='bc-content_author'>
                  <span>
                    <a href="/" className='author'>Vojtěch Bernatský</a>
                  </span>
                </div>
                <p>
                  „Od sestřičky dostávám roušku, bílou gumovou obuv, zástěru a hodně široké zelené kalhoty. Kačenka už...
                </p>
                {/* <div>
                  <a href='/' className='btn-sm'>Read More</a>
                </div> */}
              </div>
            </div>
          </article>
          <div className='add-to'>
            <a href='/' className='btn-sm'>
              <i className='far fa-plus-square' />
              <span>Add to</span>
            </a>
          </div>
        </div>
        <div className='book-item'>
          <article className='book-card'>
            <figure className='book-card_image'>
              <a href='/'>
                <img src='https://cdn.albatrosmedia.cz/Images/Product/51360434/?width=180&ts=636987354153270000' alt='Tak trochu jiná kuchařka' style={{ opacity: 1 }} />
              </a>
            </figure>
            <div className='book-card_content'>
              <div className='bc-content_inner'>
                <h2>
                  <a href='/'>Tak trochu jiná kuchařka</a>
                </h2>
                <div className='bc-content_author'>
                  <span>
                    <a href="/" className='author'>Camie</a>
                  </span>
                </div>
                <p>
                  Úspěšná YouTuberka Kamila Lindová alias Camie spojila síly s maminkou a společně vám přinášejí recep...
                </p>
                {/* <div>
                  <a href='/' className='btn-sm'>Read More</a>
                </div> */}
              </div>
            </div>
          </article>
          <div className='add-to'>
            <a href='/' className='btn-sm'>
              <i className='far fa-plus-square' />
              <span>Add to</span>
            </a>
          </div>
        </div>
        <div className='book-item'>
          <article className='book-card'>
            <figure className='book-card_image'>
              <a href='/'>
                <img src='https://cdn.albatrosmedia.cz/Images/Product/51293747/?width=180&ts=636987354153270000' alt='Smrtící bílá' style={{ opacity: 1 }} />
              </a>
            </figure>
            <div className='book-card_content'>
              <div className='bc-content_inner'>
                <h2>
                  <a href='/'>Smrtící bílá</a>
                </h2>
                <div className='bc-content_author'>
                  <span>
                    <a href="/" className='author'>Robert Galbraith (pseudonym J. K. Rowlingové)</a>
                  </span>
                </div>
                <p>
                  „Viděl jsem, jak zabili dítě.“ S těmito slovy jednoho dne navštíví utrápený mladý muž soukromého det...
                </p>
                {/* <div>
                  <a href='/' className='btn-sm'>Read More</a>
                </div> */}
              </div>
            </div>
          </article>
          <div className='add-to'>
            <a href='/' className='btn-sm'>
              <i className='far fa-plus-square' />
              <span>Add to</span>
            </a>
          </div>
        </div>
        <div className='book-item'>
          <article className='book-card'>
            <figure className='book-card_image'>
              <a href='/'>
                <img src='https://cdn.albatrosmedia.cz/Images/Product/47437123/?width=180&ts=636930825491500000' alt='Podlý král' style={{ opacity: 1 }} />
              </a>
            </figure>
            <div className='book-card_content'>
              <div className='bc-content_inner'>
                <h2>
                  <a href='/'>Podlý král</a>
                </h2>
                <div className='bc-content_author'>
                  <span>
                    <a href="/" className='author'>Holly Blacková</a>
                  </span>
                </div>
                <p>
                  Doubek je dědicem vílího trůnu a Jude musí bratříčkovi zajistit bezpečí. Právě proto k sobě připouta...
                </p>
                {/* <div>
                  <a href='/' className='btn-sm'>Read More</a>
                </div> */}
              </div>
            </div>
          </article>
          <div className='add-to'>
            <a href='/' className='btn-sm'>
              <i className='far fa-plus-square' />
              <span>Add to</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BooksJustRead;
