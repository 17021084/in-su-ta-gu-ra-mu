import {
  USERS_DATA_STATE_CHANGE,
  USERS_LIKES_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants";

const initialState = {
  users: [],
  feed: [],
  usersFollowingLoaded: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return { ...state, users: [...state.users, action.payload] };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        feed: [...state.feed, action.payload],
      };
    case USERS_LIKES_STATE_CHANGE:
      const { payload } = action;
      return {
        ...state,
        feed: state.feed.map((post) =>
          post.id == payload.postId
            ? { ...post, currentUserLike: payload.currentUserLike }
            : post
        ),
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
