import { combineReducers } from "redux";

import ScrumTableReducer from "./ScrumTableReducer";

export default combineReducers({
  scrum: ScrumTableReducer
});
