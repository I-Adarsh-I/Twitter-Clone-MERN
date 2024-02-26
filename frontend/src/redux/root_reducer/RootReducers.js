import { combineReducers } from "redux";
import UserReducer from "../slices/UserSlice";

const rootReducer = combineReducers({
    auth: UserReducer
});

export default rootReducer;
