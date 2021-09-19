import { csrfFetch } from "./csrf";

const POST_IMAGE = 'upload/POST_IMAGE'
const GET_IMAGE = 'upload/GET_IMAGE'
const DELETE_IMAGE = 'upload/DELETE_IMAGE'

const getImage = (image) => {
  return {
    type: GET_IMAGE,
    image
  }
}

const postImage = (image) => {
  return {
    type: POST_IMAGE,
    image
  }
}

const deleteImage = (id) => {
  return {
    type: DELETE_IMAGE,
    id
  }
}

export const getImages = (id) => async (dispatch) => {
  const res = await fetch(`/api/upload/${id}`)

  if(res.ok) {
    const images = await res.json()
    dispatch(getImage(images))
  }
}

export const uploadImage = (payload) => async (dispatch) => {
  const res =  await csrfFetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if(res.ok) {
    const newImage = await res.json();
    dispatch(postImage(newImage))
  }
}

export const deleteImages = (id) => async (dispatch) => {
  const res = await csrfFetch('/api/upload', {
    method: 'DELETE',
    body: JSON.stringify({id})
  });

  await res.json()
  dispatch(deleteImage(id))
  return res
}

export const updateImage = (image) => async (dispatch) => {
  const res = await csrfFetch('/api/upload', {
    method: 'PATCH',
    body: JSON.stringify(image)
  });

  const data = await res.json()
  dispatch(postImage(data))
  return data
}

const initialState = {}

const imageReducer = (state = initialState, action ) => {
  let newState = {};

  switch (action.type) {
    case GET_IMAGE:
      const oneImage = action.image
      return oneImage;
    case POST_IMAGE:
      newState = {
          ...state,
          [action.image.id]: action.image
      }
      return newState
    case DELETE_IMAGE:
      newState = { ...state }
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}

export default imageReducer;
