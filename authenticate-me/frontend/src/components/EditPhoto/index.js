import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editPhoto } from '../../store/photo';
import { useHistory } from 'react-router-dom';
import './EditPhoto.css';

const EditPhoto = ({photo, hideForm}) => {
  const id = photo.id;
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(photo.title);
  const [imageUrl, setImageUrl] = useState(photo.imageUrl);
  const [description, setDescription] = useState(photo.description);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      userId,
      title,
      imageUrl,
      description,
    }

      try{
        const dispatchPhoto = await dispatch(editPhoto(payload));
        if (dispatchPhoto) {
            hideForm();
          history.push(`/photos/${id}`);
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
            <h3> Update photo</h3>
            {errors.map((error)=>(
              <p key={error}>{error}</p>
            ))}

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Update photo</button>
          </form>)
        }
    </>
  )
};

export default EditPhoto;
