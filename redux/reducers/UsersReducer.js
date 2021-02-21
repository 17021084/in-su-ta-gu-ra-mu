import { USERS_DATA_STATE_CHANGE, USERS_POST_STATE_CHANGE } from "../constants";

const initialState = {
  users: [],
  userLoaded: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      console.log("USERS_DATA_STATE_CHANGE");
      return { ...state, users: [...state.users, action.payload] };
    case USERS_POST_STATE_CHANGE:
      let { payload } = action;
      console.log("payload");
      console.log(payload);
      return {
        ...state,
        userLoaded: state.userLoaded + 1,
        users: state.users.map((user) =>
          user.uid === payload.uid ? { ...user, posts: payload.posts } : user
        ),
      };
    case "USERS_TEST":
      console.log("USERS TEST");
      return state;
    default:
      return state;
  }
};
