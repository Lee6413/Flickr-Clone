import { csrfFetch } from './csrf';

const LOAD = 'photos/LOAD';
const ADD = 'photos/ADD';
const REMOVE = 'photos/REMOVE'
const UPDATE = 'photos/UPDATE'

const load = photos => ({
    type: LOAD,
    photos,
  });

const addPhoto = photo => ({
    type: ADD,
    photo,
  });

const removePhoto = photoId => ({
    type: REMOVE,
    photoId,
  });

export const getPhotos = () => async dispatch => {
    const response = await csrfFetch(`/api/photos`);

    if (response.ok) {
      const photos = await response.json();
      dispatch(load(photos));

    }
  };

export const retrievePhoto = (photoId) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photoId}`)
    if (response.ok) {
      const photo = await response.json();
      dispatch(addPhoto(photo))
    }
  }

export const createPhoto = (Photo) => async dispatch => {
  const response = await csrfFetch(`/api/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Photo),
  })
  if (response.ok) {
    const newPhoto = await response.json();
    const photoResult = await dispatch(addPhoto(newPhoto))
    return photoResult;
  }
  else{
    const errorResponse = await response.json();
    return errorResponse;
  }
}

export const editPhoto = (photo) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo),
    })
    if (response.ok) {
      const editedPhoto = await response.json();
      dispatch(addPhoto(editedPhoto))
      return editedPhoto;
    }
  }

export const deletePhoto = (photo) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photo.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo),
    })
    if (response.ok) {
      dispatch(removePhoto(photo.id))
      return true;
    }
  }

  const initialState = {};

  const photoReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD: {
        const allPhotos = {};
        action.photos.forEach(photo => {
            allPhotos[photo.id] = photo;
        });
        return {
          ...allPhotos,
          ...state,
        };
      }
      case ADD: {
        if (!state[action.photo.id]) {
          const newState = {
            ...state,
            [action.photo.id]: action.photo
          };
          return newState;
        }
        return {
          ...state,
          [action.photo.id]: {
            ...action.photo,
          }
        };
      }
      case REMOVE: {
          const newState = { ...state };
          delete newState[ action.photoId];
          return newState;
        }
      case UPDATE:{
        return {
            ...state,
            [action.photo.id]: {
              ...state[action.photo.id],
              ...action.photo,
            }
          };
      }
      default: {
        return state;
    }
  }
}

export default photoReducer;
