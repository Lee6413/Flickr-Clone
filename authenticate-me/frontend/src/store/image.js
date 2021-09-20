import { csrfFetch } from './csrf';
const GET_IMAGES = 'photos/GET_IMAGES';

//action_creator
const getImages = (images) => {
  return {
    type: GET_IMAGES,
    images
  }
}

//Thunk
export const getAllImages = () => async (dispatch) => {
  const res = await csrfFetch(`/api/images`)

  if( res.ok ){
    const image = await res.json()
    dispatch(getImages(image))
    return image
  }
}


//Reducer
const initialState = {};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      const allImages = {}
      action.images.picture.forEach(image => {
        allImages[image.id] = image
      });
      return {
        ...state,
        ...allImages
      };
    default:
      return state;
  }
}

export default imagesReducer
