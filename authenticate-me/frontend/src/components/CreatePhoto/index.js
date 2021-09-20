import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPhoto, } from '../../store/photo';
import { useHistory } from 'react-router-dom';
import './CreatePhoto.css';

const CreatePhoto = () => {
  const userId = useSelector(state => state.session.user?.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
    userId,
    title,
    imageUrl,
    description,
    };

    try{
      const createdPhoto = await dispatch(createPhoto(payload));
      if (createdPhoto) {
        history.push(`/photos/${createdPhoto.photo.id}`);
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
          <h2> Upload a New Photo </h2>
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
          <button type="submit">Create new photo</button>
        </form>)
      }
    </>
   )
}

export default CreatePhoto;
