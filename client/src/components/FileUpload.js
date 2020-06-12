import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

import './FileUpload.css';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(`${__dirname}/client/public/img/authors/`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear progress bar (percentage)
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500)
        setMessage('There was a problem with the server');
      else setMessage(err.response.data.msg);
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form className='custom-form' onSubmit={onSubmit}>
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input type='submit' value='Upload' className='btn custom-input' />
      </form>
      {uploadedFile ? (
        <div>
          <div className='custom-div'>
            <h3>{uploadedFile.fileName}</h3>
            <img src={uploadedFile.filePath} alt={uploadedFile.fileName} />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
