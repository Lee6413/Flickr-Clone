import { csrfFetch } from './csrf';

const LOAD = 'comments/LOAD';
const ADD = 'comments/ADD';
const REMOVE = 'comments/REMOVE'
const UPDATE = 'comments/UPDATE'

const load = comments => ({
    type: LOAD,
    comments,
  });

const addComment = comment => ({
    type: ADD,
    comment,
  });

const removeComment = commentId => ({
    type: REMOVE,
    commentId,
  });

export const getComments = (photoId) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photoId}/comments`);

    if (response.ok) {
      const comments = await response.json();
      dispatch(load(comments));

    }
  };

export const retrieveComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`)
    if (response.ok) {
      const comment = await response.json();
      dispatch(addComment(comment))
    }
  }

export const createComment = (Comment) => async dispatch => {
  const response = await csrfFetch(`/api/photos/${Comment.photoId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Comment),
  })
  if (response.ok) {
    const newComment = await response.json();
    const commentResult = await dispatch(addComment(newComment))
    return commentResult;
  }
  else{
    const errorResponse = await response.json();
    return errorResponse;
  }
}

export const editComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      const editedComment = await response.json();
      dispatch(addComment(editedComment))
      return editedComment;
    }
  }

export const deleteComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      dispatch(removeComment(comment.id))
      return true;
    }
  }


  const initialState = {};

  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
     case LOAD: {
            const allComments = {};
            action.comments.forEach(comment => {
                allComments[comment.id] = comment;
            });
            return {
              ...allComments,
              ...state,
        };
        }
      case ADD: {
        if (!state[action.comment.id]) {
          const newState = {
            ...state,
            [action.comment.id]: action.comment
          };
          return newState;
        }
        return {
          ...state,
          [action.comment.id]: {
            ...action.comment,
          }
        };
      }
      case REMOVE: {
          const newState = { ...state };
          delete newState[ action.commentId];
          return newState;
        }
      case UPDATE:{
        return {
            ...state,
            [action.comment.id]: {
              ...state[action.comment.id],
              ...action.comment,
            }
          };
      }
      default: {
        return state;
    }
  }
}

export default commentReducer;
