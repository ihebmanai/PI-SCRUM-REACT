import {
  getUserStories,
  getColumns,
  getSprints,
  getMemberBySprint,
  getMemberBySprintRate
} from "../api/ScrumTableApi";
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
} from "./ActionTypes";

export const fetchUserStories = () => {
  return dispatch => {
    dispatch({ type: FETCH_USERSTORIES_REQUEST });
    getUserStories().then(
      res => {
        dispatch({ type: FETCH_USERSTORIES_SUCCESS, payload: res.data });
      },
      err => {
        dispatch({ type: FETCH_USERSTORIES_FAILED, payload: err });
      }
    );
  };
};
export const fetchColumns = () => {
  return dispatch => {
    dispatch({ type: FETCH_COLUMNS_REQUEST });
    getColumns().then(
      res => {
        dispatch({ type: FETCH_COLUMNS_SUCCESS, payload: res.data });
      },
      err => {
        dispatch({ type: FETCH_COLUMNS_FAILED, payload: err });
      }
    );
  };
};
export const fetchSprints = () => {
  return dispatch => {
    dispatch({ type: FETCH_SPRINTS_REQUEST });
    getSprints().then(
      res => {
        dispatch({ type: FETCH_SPRINTS_SUCCESS, payload: res.data });
      },
      err => {
        dispatch({ type: FETCH_SPRINTS_FAILED, payload: err });
      }
    );
  };
};
export const fetchMemberBySprint = idSprint => {
  return dispatch => {
    dispatch({ type: FETCH_MEMBERSPRINTS_REQUEST });
    getMemberBySprint(idSprint).then(
      res => {
        dispatch({ type: FETCH_MEMBERSPRINTS_SUCCESS, payload: res.data });
      },
      err => {
        dispatch({ type: FETCH_MEMBERSPRINTS_FAILED, payload: err });
      }
    );
  };
};
export const fetchMemberBySprintRate = idSprint1 => {
  return dispatch => {
    dispatch({ type: FETCH_MEMBERSPRINTSRATE_REQUEST });
    getMemberBySprintRate(idSprint1).then(
      res => {
        dispatch({ type: FETCH_MEMBERSPRINTSRATE_SUCCESS, payload: res.data });
      },
      err => {
        dispatch({ type: FETCH_MEMBERSPRINTSRATE_FAILED, payload: err });
      }
    );
  };
};
