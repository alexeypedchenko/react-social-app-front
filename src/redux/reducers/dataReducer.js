import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
} from '../types'

const initialState = {
  screams: [],
  scream: {},
  loading: false,
}

/* eslint-disable-next-line */
export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      }
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loading: false,
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const screamIndex = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
      state.screams[screamIndex] = action.payload
      return {
        ...state
      }
    case DELETE_SCREAM:
      const index = state.screams.findIndex((scream) => scream.screamId === action.payload)
      state.screams.splice(index, 1)
      return {
        ...state
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,
          ...state.screams
        ]
      }
    default:
      return state
  }
}