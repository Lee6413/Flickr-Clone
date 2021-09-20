import { useEffect } from 'react'
// import { useParams, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { getAllImages } from '../../store/image'
import { Link } from 'react-router-dom'
import './imagePage.css'

function ImagePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const images = useSelector(state => state.image&&Object.values(state.image));
  // const { id } = useParams();

  useEffect(() => {
    dispatch(getAllImages())
  }, [dispatch])
  if(!images) {
    return null;
  }

  return (
    <div className="single-container">
      <Link to="/upload" className="upload-wrapper">
        <img className="pic-wrapper" src="https://i.imgur.com/RTuAJkt.png"/>
      </Link>
      <div className="photo-wrapper" >
        {images.map((image) => (
         <Link to={`/photos/${image.id}`} className="pic-wrapper">
            <img className="pic" src={image.imageUrl}/>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ImagePage
