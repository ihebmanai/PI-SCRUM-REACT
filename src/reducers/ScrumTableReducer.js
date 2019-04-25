import {
  FETCH_USERSTORIES_REQUEST,
  FETCH_USERSTORIES_SUCCESS,
  FETCH_USERSTORIES_FAILED,
  FETCH_COLUMNS_REQUEST,
  FETCH_COLUMNS_SUCCESS,
  FETCH_COLUMNS_FAILED,
  FETCH_SPRINTS_REQUEST,
  FETCH_SPRINTS_SUCCESS,
  FETCH_SPRINTS_FAILED,
  FETCH_MEMBERSPRINTS_REQUEST,
  FETCH_MEMBERSPRINTS_SUCCESS,
  FETCH_MEMBERSPRINTS_FAILED,
  FETCH_MEMBERSPRINTSRATE_REQUEST,
  FETCH_MEMBERSPRINTSRATE_SUCCESS,
  FETCH_MEMBERSPRINTSRATE_FAILED
} from "../actions/ActionTypes";

let INITIAL_STATE = {
  userStories: [],
  columns: [],
  sprints: [],
  memberBySprint: [],
  rates: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case FETCH_USERSTORIES_REQUEST:
      newState = { ...state, loading: true };
      break;
    case FETCH_USERSTORIES_SUCCESS:
      newState = { ...state, loading: false, userStories: action.payload };
      break;
    case FETCH_USERSTORIES_FAILED:
      newState = { ...state, userStories: action.payload };
      break;
    case FETCH_COLUMNS_REQUEST:
      newState = { ...state, loading: true };
      break;
    case FETCH_COLUMNS_SUCCESS:
      newState = { ...state, loading: false, columns: action.payload };
      break;
    case FETCH_COLUMNS_FAILED:
      newState = { ...state, columns: action.payload };
    case FETCH_SPRINTS_REQUEST:
      newState = { ...state, loading: true };
      break;
    case FETCH_SPRINTS_SUCCESS:
      newState = { ...state, loading: false, sprints: action.payload };
      break;
    case FETCH_SPRINTS_FAILED:
      newState = { ...state, sprints: action.payload };
      break;
    case FETCH_MEMBERSPRINTS_REQUEST:
      newState = { ...state, loading: true };
      break;
    case FETCH_MEMBERSPRINTS_SUCCESS:
      newState = { ...state, loading: false, memberBySprint: action.payload };
      break;
    case FETCH_MEMBERSPRINTS_FAILED:
      newState = { ...state, memberBySprint: action.payload };
      break;
    case FETCH_MEMBERSPRINTSRATE_REQUEST:
      newState = { ...state, loading: true };
      break;
    case FETCH_MEMBERSPRINTSRATE_SUCCESS:
      newState = { ...state, loading: false, rates: action.payload };
      break;
    case FETCH_MEMBERSPRINTSRATE_FAILED:
      newState = { ...state, rates: action.payload };
      break;
    default:
      newState = state;
  }
  return newState;
};
