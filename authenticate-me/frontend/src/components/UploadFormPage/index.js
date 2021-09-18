import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import './UploadFormPage.css'

function UploadFormPage() {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');


  if( sessionUser) {
    history.push('/upload');
    // <Redirect to="/" />
  }


  return (
    <>
    <div className='body'>
      <h1>Upload Form</h1>
    </div>
    <div className='form'>
      <form>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <label>
          Image URL
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Content
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
    </>
  );
}


export default UploadFormPage;

/* I have a few questions:
    1. The thunk is suppose to save/load data from the frontend to backend and backend to frontend, correct?
    2. Looking at the frontend/src/store/session.js looks similar to the get/post/patch and delete methods but I am confused on how it works with the backend and I don't understand what sessionReducer does.
    3. After the image and content are save to the backend, it should display on the logged in users home page as a card. Would I need a thunk for the home page to load the image?
    4. I have a form written for a user to upload an image but it won't render on the page.
*/
