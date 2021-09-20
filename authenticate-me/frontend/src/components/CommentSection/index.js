import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getComments, } from '../../store/comment';
import { useHistory } from 'react-router-dom';
import SingleComment from '../SingleComment';


const CommentSection = ({photoId}) => {
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const comments = useSelector(state => {
      return Object.values(state.comments)
  });

  useEffect(() => {
      async function fetchData() {
        await dispatch(getComments(photoId));
      }
      fetchData();
  }, [dispatch])


  if (!comments.length) {
      return null;
  }
  return (
    <main>
      <div>
        { comments.map((comment) => {
          return (
            <SingleComment comment={comment} />
          );
        })}
      </ div>
    </main>
  );
};

export default CommentSection;
