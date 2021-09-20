import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { retrievePhoto, deletePhoto } from '../../store/photo';
import EditPhoto from './../EditPhoto';
import CreateComment from '../CreateComment';
import CommentSection from '../CommentSection';
import './SinglePhotoPage.css';

export const SinglePhotoPage = () => {
  const { photoId } = useParams();
  const photos = useSelector(state => state.photos);
  const userId = useSelector(state => state.session.user?.id);
  const selectedPhoto = photos[photoId]
  const dispatch = useDispatch();
  const history = useHistory();

  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try{
        const response = await dispatch(retrievePhoto(photoId));
      } catch (err){
        history.push("/photos");
      }
    }
    fetchData();
  }, [dispatch, photoId]);


  const handleDelete = async (e) => {
      e.preventDefault();
      const dispatchPhoto = await dispatch(deletePhoto(selectedPhoto));
      history.push("/photos");
  }

  let content = null;
  if (showEditForm){
    content = (
      <EditPhoto photo={selectedPhoto} hideForm={() => setShowEditForm(false)} />
    )
  }

  if(!selectedPhoto){
    return null;
  }

  return (
    <div className="photo-detail">
      {console.log(photos, "photo")}
      <h4> {selectedPhoto.title} </h4>
      <img src={selectedPhoto.imageUrl} />
      <p>{selectedPhoto.description}</p>
      {selectedPhoto.userId === userId ? <button onClick={() => setShowEditForm(!showEditForm)}>Edit Photo</button> : null}
      {selectedPhoto.userId === userId ? <button onClick={handleDelete}>Delete Photo</button> : null}
      {content}
      <CommentSection photoId = {selectedPhoto.id} />
      <CreateComment photoId = {selectedPhoto.id} />
    </div>
  )
}

export default SinglePhotoPage;
