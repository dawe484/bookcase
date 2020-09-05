import React, { useContext, useEffect } from 'react';
import pdfjsLib from 'pdfjs-dist/es5/build/pdf';
import pdfjsWorker from 'pdfjs-dist/es5/build/pdf.worker.entry';

import BookContext from '../../context/book/bookContext';

import Spinner from '../layout/Spinner';

const ViewerPage = ({ match }) => {
  // console.log(match.params.urlTitle);

  const bookContext = useContext(BookContext);

  const { book, getBook, loading } = bookContext;

  // const { title } = book;
  // if (book != null && !loading) console.log(book);

  // useEffect(() => {
  //   getBook(match.params.urlTitle);

  //   // eslint-disable-next-line
  // }, []);

  if (book != null && !loading) {
    setTimeout(() => {
      // Loading file from file system into typed array
      const pdfPath = process.argv[2] || `../../../../docs/Rowling.pdf`;

      let pdfDoc = null,
        pageNum = 1,
        pageIsRendering = false,
        pageNumIsPending = null;

      let scale = 1.25;
      // let canvas = document.querySelector('#pdf-render'),
      //   ctx = canvas.getContext('2d');

      // console.log(canvas);

      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

      // Get document
      pdfjsLib
        .getDocument(pdfPath)
        .promise.then((pdfDoc_) => {
          // if (pdfDoc) pdfDoc.destroy();

          var numPages = pdfDoc_.numPages;
          pdfDoc = pdfDoc_;

          console.log('# Document Loaded');
          console.log('Number of Pages: ' + numPages);
          // console.log(pdfDoc);

          document.querySelector('#page-count').textContent = pdfDoc.numPages;

          renderPage(pageNum);
        })
        .catch((err) => {
          // const parentDiv = canvas.parentNode;
          // console.log(parentDiv);
          // // Display Error
          // const div = document.createElement('div');
          // div.className = 'error';
          // div.appendChild(document.createTextNode(err.message));
          // parentDiv.insertBefore(div, canvas);
          // // Remove Buttons
          // document.querySelector('.books-list-container').style.display =
          //   'none';
          // document.querySelector('#prev-page').style.display = 'none';
          // document.querySelector('#next-page').style.display = 'none';
          // document.querySelector('.page-info').style.display = 'none';
        });

      // Render the page
      const renderPage = (num) => {
        pageIsRendering = true;

        // Get page
        pdfDoc.getPage(num).then((page) => {
          let canvas = document.querySelector('#pdf-render'),
            ctx = canvas.getContext('2d');

          // Set scale
          const viewport = page.getViewport({ scale });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderCtx = {
            canvasContext: ctx,
            viewport,
          };

          page.render(renderCtx).promise.then(() => {
            // console.log(renderCtx);
            pageIsRendering = false;
            if (pageNumIsPending !== null) {
              renderPage(pageNumIsPending);
              pageNumIsPending = null;
            }
          });

          // Output current page
          document.querySelector('#page-num').textContent = num;
        });
      };

      // Check for pages rendering
      const queueRenderPage = (num) => {
        if (pageIsRendering) pageNumIsPending = num;
        else renderPage(num);
      };

      // Show Prev Page
      const showPrevPage = () => {
        if (pageNum <= 1) return;

        pageNum--;
        queueRenderPage(pageNum);
      };

      // Show Next Page
      const showNextPage = () => {
        if (pageNum >= pdfDoc.numPages) return;

        pageNum++;
        queueRenderPage(pageNum);
      };

      // Zoom In
      const zoomIn = () => {
        scale += 0.25;
        renderPage(pageNum);
      };

      // Zoom Out
      const zoomOut = () => {
        scale -= 0.25;
        renderPage(pageNum);
      };

      // Button Events
      document
        .querySelector('#prev-page')
        .addEventListener('click', showPrevPage);

      document
        .querySelector('#next-page')
        .addEventListener('click', showNextPage);

      document.querySelector('#zoom-in').addEventListener('click', zoomIn);

      document.querySelector('#zoom-out').addEventListener('click', zoomOut);
    }, 1000);
  }

  return (
    <div className='container'>
      {book !== null && !loading ? (
        <div className='books-list-container'>
          <div className='list-row'>
            <div className='list-title'>
              <i className='icon fas fa-star' aria-hidden='true' />
              <h1>PDF Viewer - {book.title}</h1>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      <canvas id='pdf-render'></canvas>
      <div>
        <button className='btn' id='prev-page'>
          Prev page
        </button>
        <button className='btn' id='next-page'>
          Next page
        </button>
        <span className='page-info'>
          Page <span id='page-num'></span> of <span id='page-count'></span>
        </span>
        <div id='zoom-controls'>
          <button className='btn' id='zoom-in'>
            +
          </button>
          <button className='btn' id='zoom-out'>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
