import React, {
  Fragment,
  createRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modali, { useModali } from 'modali';

import Alerts from '../layout/Alerts';
// import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
// import { cs, enGB } from 'date-fns/esm/locale';

import FileUpload from '../FileUpload';

import Authors from '../authors/Authors';
import AuthorsFilter from '../authors/AuthorsFilter';

import AuthContext from '../../context/auth/authContext';
import AuthorContext from '../../context/author/authorContext';
import AlertContext from '../../context/alert/alertContext';

import { authorNationality } from './enums/authorNationality';

// import "react-datepicker/dist/react-datepicker.css";
import './AuthorsPage.css';

// registerLocale('cs', cs);
const lang = 'cs';

const AuthorsPage = () => {
  const authContext = useContext(AuthContext);
  const authorContext = useContext(AuthorContext);
  const alertContext = useContext(AlertContext);

  const { isAuthenticated, user } = authContext;
  const { error, clearAuthorErrors } = authorContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'Author already exists') {
      setAlert(error, 'danger');
      toggleAlertModal();
      clearAuthorErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  const [author, setAuthor] = useState({
    name: '',
    pseudonym: '',
    birthdate: '',
    deathdate: '',
    nationality: '',
    portrait: '',
    portraitAuthorName: '',
    resume: '',
    resumeSource: '',
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
  });

  const {
    name,
    pseudonym,
    birthdate,
    deathdate,
    nationality,
    portrait,
    portraitAuthorName,
    resume,
    resumeSource,
    website,
    facebook,
    instagram,
    twitter,
  } = author;

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const modalContainer = createRef();

  const [addAuthorModal, toggleAddAuthorModal] = useModali({
    animated: true,
  });

  const [alertModal, toggleAlertModal] = useModali({
    animated: true,
    message: <Alerts />,
    onShow: () => setTimeout(toggleAlertModal, 2500),
  });

  const nationalityEnum = () => {
    let select = document.getElementById('nationality');

    if (!select.options.length) {
      for (let element in authorNationality) {
        if (element === lang) {
          for (let i in authorNationality[element]) {
            let nationalityOption = authorNationality[element][i];
            let opt = document.createElement('option');
            opt.value = opt.text = opt.id = nationalityOption;
            select.appendChild(opt);
          }
        }
      }
    }
  };

  const addAuthorLink = (
    <Fragment>
      <AuthorsFilter />
      <Link to='/authors' className='btn btn-ml' onClick={toggleAddAuthorModal}>
        {/* Add Author */}
        Přidat autora
      </Link>
    </Fragment>
  );

  const selectNationality = () => {
    if (document.getElementById('nationality').value === '') {
      return '';
    } else {
      let selector = document.getElementById('nationality');
      let value = selector[selector.selectedIndex].value;
      return document.getElementById(value).text;
    }
  };

  const pseudonymArray = () => {
    const arr = document.getElementById('pseudonym').value.split(', ');
    return arr;
  };

  // const validURL = (str) => {
  //   let pattern = new RegExp(
  //     '^(https?:\\/\\/)?' + // protocol
  //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  //       '(\\#[-a-z\\d_]*)?$',
  //     'i'
  //   ); // fragment locator
  //   return !!pattern.test(str);
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('Author Added');
    // if (validURL(website))
    //   if (website.includes('https://'))
    //     author.website = website;
    //   else if (website.includes('http'))
    //     console.log('http');
    //   else
    //     console.log('no');
    // else
    //   console.log('No valid website');

    // author.portrait = filename;
    console.log(pseudonym.length);
    pseudonym.length !== 0
      ? (author.pseudonym = pseudonymArray())
      : (author.pseudonym = []);
    author.nationality = selectNationality();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;
      // console.log(fileName, filePath);

      setUploadedFile({ fileName, filePath });
      author.portrait = filePath;
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }

    // authorContext.addAuthor(author);
    console.log(author);
    resetAuthor();
  };

  const resetAuthor = () => {
    toggleAddAuthorModal();
    setAuthor({
      name: '',
      pseudonym: '',
      birthdate: '',
      deathdate: '',
      nationality: '',
      portrait: '',
      portraitAuthorName: '',
      resume: '',
      resumeSource: '',
      website: '',
      facebook: '',
      instagram: '',
      twitter: '',
    });
  };

  // const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='container'>
      <div className='authors-list-container'>
        <div className='list-row'>
          <div className='list-title'>
            <i className='icon fas fa-pencil-alt' aria-hidden='true' />
            {/* <h1 data-text='Authors'>Authors</h1> */}
            <h1>Autoři</h1>
          </div>
          <div className='search-pos'>
            {isAuthenticated && user.role === 'superhero' ? (
              addAuthorLink
            ) : (
              <AuthorsFilter />
            )}
          </div>
        </div>
        <FileUpload />
        <div className='items-list'>
          <Authors />
        </div>
      </div>
      {/* <Fragment>
        <form>
          <div className='custom-file'>
            <input type="file" className='custom-file-input' id='customFile' />
            <label className='custom-file-label' htmlFor="customFile">
              Choose File
            </label>
          </div>

          <input type='submit' value='Upload' className='btn'></input>
        </form>
      </Fragment> */}
      <Modali.Modal {...addAuthorModal}>
        <div className='modal-container add-container' ref={modalContainer}>
          <div className='list-row add'>
            <div className='list-title'>
              <h1>Přidat autora</h1>
            </div>
          </div>
          <form
            action='/upload'
            encType='multipart/form-data'
            onSubmit={onSubmit}
          >
            <div className='input-field add'>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                required
              />
              <label>Jméno a Příjmení</label>
              {/* <input type='file' className='file-input' id='portrait' name='portrait' value={portrait} onChange={onChange} accept='image/png, image/jpeg' /> */}
              {/* <input
                type='text'
                name='portrait'
                id='portraitFile'
                value={portrait}
                onChange={onChange}
              /> */}
              <input
                type='file'
                id='portraitFile'
                name='portrait'
                onChange={onFileChange}
              />
              <label htmlFor='portraitFile'>Fotografie</label>
              {/* <label htmlFor='portraitFile'>{filename}</label> */}
              {/* <label htmlFor='portrait' className='file-select'>
                <span className='span-add'>
                Vybrat soubor (PNG, JPG)
                </span>
              </label> */}
              <input
                type='text'
                name='pseudonym'
                id='pseudonym'
                value={pseudonym}
                onChange={onChange}
              />
              <label>
                Pseudonym
                <span> (volitelný)</span>
              </label>
              <div className='picturefile'></div>
              {/* <DatePicker locale='cs' selected={startDate} onChange={date => setStartDate(date)} required /> */}
              <input
                type='text'
                name='birthdate'
                value={birthdate}
                onChange={onChange}
                pattern='[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}'
                title='Datum narození musí být ve formátu DD-MM-RRRR'
              />
              <label>Datum narození</label>
              <input
                type='text'
                name='deathdate'
                value={deathdate}
                onChange={onChange}
                pattern='[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}'
                title='Datum úmrtí musí být ve formátu DD-MM-RRRR'
              />
              <label>
                Datum úmrtí
                <span> (volitelný)</span>
              </label>
              <select
                name='nationality'
                id='nationality'
                onFocus={nationalityEnum}
              ></select>
              <label>
                Národnost
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='portraitAuthorName'
                value={portraitAuthorName}
                onChange={onChange}
              />
              <label>
                Autor/ka fotky
                <span> (volitelný)</span>
              </label>
              <textarea
                className='resume-textarea'
                name='resume'
                value={resume}
                onChange={onChange}
              />
              <label>
                Biografie
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='resumeSource'
                value={resumeSource}
                onChange={onChange}
              />
              <label>
                Zdroj biografie
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='website'
                value={website}
                onChange={onChange}
              />
              <label>
                Web
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='facebook'
                value={facebook}
                onChange={onChange}
              />
              <label>
                Facebook
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='instagram'
                value={instagram}
                onChange={onChange}
              />
              <label>
                Instagram
                <span> (volitelný)</span>
              </label>
              <input
                type='text'
                name='twitter'
                value={twitter}
                onChange={onChange}
              />
              <label>
                Twitter
                <span> (volitelný)</span>
              </label>
            </div>
            <div className='list-row add'>
              <div className='list-button'>
                <button id='btnSave' className='btn' type='submit' value='Save'>
                  Uložit
                </button>
                <button
                  id='btnCancel'
                  className='btn'
                  type='reset'
                  value='Cancel'
                  onClick={resetAuthor}
                >
                  Zrušit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modali.Modal>
      <Modali.Modal {...alertModal} />
    </div>
  );
};

export default AuthorsPage;
