import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, } from '../../store/comment';
import { useHistory } from 'react-router-dom';

const CreateComment = ({photoId}) => {
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
    userId,
    content,
    photoId
    };
    try{
      const createdComment = await dispatch(createComment(payload));
      if (createdComment) {
        history.push(`/photos/${photoId}`);
      }
    } catch (err){
      const errorResponse = await err.json();
      const errorsArray = errorResponse.errors.filter(error => error !=="Invalid value")
      setErrors(errorsArray)
    }
  };

  return (
    <>
      { userId && (
        <form onSubmit={handleSubmit} className='photo-form'>
          <h3> Comments </h3>
          {errors.map((error)=>(
            <p key={error}>{error}</p>
          ))}
          <input
            type="text"
            placeholder="Comment Here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Post Comment</button>
        </form>)
      }
    </>
  )
};

export default CreateComment;
