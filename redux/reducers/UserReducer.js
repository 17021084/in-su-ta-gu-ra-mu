import { State } from "react-native-gesture-handler";
import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE } from "../constants";

const initialState = {
  currentUser: null,
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return { ...state, currentUser: action.payload };
    case USER_POST_STATE_CHANGE:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
