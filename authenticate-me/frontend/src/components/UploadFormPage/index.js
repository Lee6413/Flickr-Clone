import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import * as uploadActions from "../../store/upload";
import * as sessionActions from '../../store/session';
import './UploadFormPage.css'

function UploadFormPage() {
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    let userId = sessionUser.id
    window.location.replace('/images')
    return dispatch(uploadActions.uploadImage({userId, imageUrl, content}))
  }

  return (
    <div className="wrapper">
      <div className="form_container">
      <div className="title_container">
      <h2 className="header">Upload An Image!</h2>
      </div>
      <form onSubmit={onSubmit} className='upload-form'>
        <label>
          Image URL
        </label>
          <input className='form-input-url'
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image Url"
            required
          />
      {/* <div className="input_field"> <span><i aria-hidden="true" className="caption"></i></span> */}
        <label>
          Content
        </label>
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Caption your image!'
            rows="4"
            cols="30"
            required
          />
        {/* </div> */}
        <button className="button" type="submit" >Upload Post</button>
      </form>
      </div>
    </div>
  );
}


export default UploadFormPage;

/* I have a few questions:
    1. The thunk is suppose to save/load data from the frontend to backend and backend to frontend, correct?
    2. Looking at the frontend/src/store/session.js looks similar to the get/post/patch and delete methods but I am confused on how it works with the backend and I don't understand what sessionReducer does.
    3. After the image and content are save to the backend, it should display on the logged in users home page as a card. Would I need a thunk for the home page to load the image?
    4. I have a form written for a user to upload an image but it won't render on the page.
*/
