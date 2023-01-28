import { combineReducers } from "redux";
import articleReducer from "./article";
import userReducer from "./user";

const rootReducer = combineReducers({
  userState: userReducer,
  articleState: articleReducer,
});

export default rootReducer;
