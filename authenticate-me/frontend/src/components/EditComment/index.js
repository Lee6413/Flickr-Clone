import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editComment } from '../../store/comment';
import { useHistory } from 'react-router-dom';


const EditComment = ({comment, hideForm}) => {
  const id = comment.id;
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [content, setContent] = useState(comment.content);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id,
      content
    }

    try{
      const dispatchComment = await dispatch(editComment(payload));
      if (dispatchComment) {
        hideForm();
      }
    } catch(err){
        const errorResponse = await err.json();
        const errorsArray = errorResponse.errors.filter(error => error !=="Invalid value")
        setErrors(errorsArray)
    }
  };


  return (
    <>
      { userId && (
        <form onSubmit={handleSubmit} className='photo-form'>
          <h3> Update Comment</h3>
          {errors.map((error)=>(
            <p key={error}>{error}</p>
          ))}

          <input
            type="text"
            placeholder="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>)
    }
  </>
  )
};

export default EditComment;
