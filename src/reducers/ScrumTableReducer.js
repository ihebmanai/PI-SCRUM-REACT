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
  FETCH_MEMBERSPRINTSRATE_FAILED,
  UPDATE_RATEMEMBER_REQUEST,
  UPDATE_RATEMEMBER_SUCCESS,
  UPDATE_RATEMEMBER_FAILED,
  RESET_STORE,
  FETCH_ABSENCE_REQUEST,
  FETCH_ABSENCE_SUCCESS,
  FETCH_ABSENCE_FAILED,
  FETCH_WORKDONE_REQUEST,
  FETCH_WORKDONE_SUCCESS,
  FETCH_WORKDONE_FAILED,
  UPDATE_ETAT_REQUEST,
  UPDATE_ETAT_SUCCESS,
  UPDATE_ETAT_FAILED
} from "../actions/ActionTypes";

let INITIAL_STATE = {
  res:[],
  absence:"",
  workDone:"",
  userStories: [],
  columns: [],
  sprints: [],
  memberBySprint: [],
  memberRateBySprint: [],
  rates: [],
  loading: false,
  loadingAbsence:false,
  loadingUpdateEtat:false
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
      newState = { ...state, loading: false, memberRateBySprint: action.payload };
      break;
    case FETCH_MEMBERSPRINTSRATE_FAILED:
      newState = { ...state, memberRateBySprint: action.payload };
      break;
      case UPDATE_RATEMEMBER_REQUEST:
      newState = { ...state, loading: true };
      break;
    case UPDATE_RATEMEMBER_SUCCESS:
      newState = { ...state, loading: false, res: action.payload };
      break;
      
    case UPDATE_RATEMEMBER_FAILED:
      newState = { ...state, res: action.payload };
      break;
      case FETCH_ABSENCE_REQUEST:
      newState = { ...state, loadingAbsence: true };
      break;
    case FETCH_ABSENCE_SUCCESS:
      newState = { ...state, loadingAbsence: false, absence: action.payload };
      break;
    case FETCH_ABSENCE_FAILED:
      newState = { ...state, absence: action.payload };
      break;
      case FETCH_WORKDONE_REQUEST:
      newState = { ...state, loadingAbsence: true };
      break;
    case FETCH_WORKDONE_SUCCESS:
      newState = { ...state, loadingAbsence: false, workDone: action.payload };
      break;
    case FETCH_WORKDONE_FAILED:
      newState = { ...state, workDone: action.payload };
      break;
      case UPDATE_ETAT_REQUEST:
      newState = { ...state, loadingUpdateEtat: true };
      break;
    case UPDATE_ETAT_SUCCESS:
      newState = { ...state, loadingUpdateEtat: false, res: action.payload };
      break;
    case UPDATE_ETAT_FAILED:
      newState = { ...state, res: action.payload };
      break;
      case RESET_STORE:
      newState = { ...state,memberRateBySprint:{},memberBySprint:{} };
      break;
    default:
      newState = state;
  }
  return newState;
};
