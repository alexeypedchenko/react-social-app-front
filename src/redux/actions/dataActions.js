import {
  LOADING_DATA,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
} from '../types'

import axios from 'axios'

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios.get('/screams')
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log('err:', err)
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

export const likeScream = (screamId) => (dispatch) => {
  axios.get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      })
    })
    .catch((err) => console.log('err:', err))
}
export const unlikeScream = (screamId) => (dispatch) => {
  axios.get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      })
    })
    .catch((err) => console.log('err:', err))
}

export const submitComment = (screamId, commentData) => (dispatch) => {
  axios.post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      })
      dispatch(clearErrors())
    })
    .catch((err) => {
      console.log('err:', err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const deleteScream = (screamId) => (dispatch) => {
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      })
    })
    .catch((err) => console.log('err:', err))
}

export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios.post('/scream', newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch((err) => {
      console.log('err:', err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI })
 
  axios.get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch((err) => console.log('err:', err))
}
