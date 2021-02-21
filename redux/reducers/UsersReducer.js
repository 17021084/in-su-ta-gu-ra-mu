import { USERS_DATA_STATE_CHANGE, USERS_POST_STATE_CHANGE } from "../constants";

const initialState = {
  users: [],
  usersFollowingLoaded: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return { ...state, users: [...state.users, action.payload] };
    case USERS_POST_STATE_CHANGE:
      let { payload } = action;
      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        users: state.users.map((user) =>
          user.uid === payload.uid ? { ...user, posts: payload.posts } : user
        ),
      };
    default:
      return state;
  }
};
