import { csrfFetch } from "./csrf";

const EVERY_COMMENT = 'comment/EVERY_COMMENT';
const POST_COMMENT = 'comment/POST_COMMENT';
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

const everyComment = (comments) => ({
    type: EVERY_COMMENT,
    comments
});

const postComment = (comment) => ({
    type: POST_COMMENT,
    comment
});

const updateComment = (comment ) => ({
    type: UPDATE_COMMENT,
    comment
});

const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
});

export const everyCommentThunk = (id) => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/pic/${id}`)
  if(res.ok) {
    const allComments = await res.json()
    dispatch(everyComment(allComments))
  }
}

//create comment
export const createCommentThunk = payload => async(dispatch) => {
  const res = await csrfFetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const newComment = await res.json();
  dispatch(postComment(newComment))
  return newComment
}

//edit comment
export const updateCommentThunk = ({commentId, comment}) => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify({comment})
  });

  const data = await res.json();
  dispatch(updateComment(data))
}

//delete comment
export const deleteCommentThunk = (id) => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: 'DELETE'
  });

  if(res.ok) {
    await res.json()
    dispatch(deleteComment(id))
    return res
}
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case POST_COMMENT:
      newState = {
          ...state,
          [action.comment.id]: action.comment
      }
      return newState

    case EVERY_COMMENT:
      const allComments = {}
      action.comments.forEach(cmnt => {
          allComments[cmnt.id] = cmnt;
      })
      return {
          ...newState,
          ...allComments
      }

    case DELETE_COMMENT:
      newState = { ...state}
      delete newState[action.id]
      return newState

    case UPDATE_COMMENT:
      return {
          ...state,
          [action.comment.id]: action.comment
      }
      default:
          return state;
  }
}

export default commentReducer
