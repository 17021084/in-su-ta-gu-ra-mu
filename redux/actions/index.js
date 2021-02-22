import firebase from "firebase";
import {
  USER_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_LIKES_STATE_CHANGE,
} from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            payload: snapshot.data(),
          });
        } else {
          console.log("does not exist");
        }
      });
  };
};

export const fetchUserPosts = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          let { caption, downloadURL, creation } = doc.data();
          creation = creation.seconds;
          let id = doc.id;
          return {
            id,
            creation,
            caption,
            downloadURL,
          };
        });
        dispatch(addPost(posts));
      });
  };
};
export const fetchUserFollowing = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      // whever collection change (set or delete it will run )
      .onSnapshot((snapshot) => {
        let listUsers = snapshot.docs.map((doc) => {
          return doc.id;
        });
        dispatch(userFollowingChange(listUsers));

        // because we use mongo DB so. we must to get following user id, then each of these we fetch its posts
        // fetch following user -> each of them fetch its userData (save in users list of userSreducer)
        // and inside action fetch usersdata call fetch usefollowing posts
        for (let i = 0; i < listUsers.length; ++i) {
          dispatch(fetchUsersData(listUsers[i], true));
        }
      });
  };
};

const userFollowingChange = (listFollowing) => {
  return {
    type: USER_FOLLOWING_STATE_CHANGE,
    payload: listFollowing,
  };
};

export const addPost = (posts) => {
  return {
    type: USER_POST_STATE_CHANGE,
    payload: posts,
  };
};
// fetch user data of following user
export const fetchUsersData = (uid, getPosts) => {
  console.log("fetchUsersData");
  return (dispatch, getState) => {
    // check xem lieu thang dang follow co trong list ko, neu co roi thi ko fetch
    const found = getState().usersState.users.some((el) => el.id === uid);
    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            // console.log(snapshot);
            dispatch({
              type: USERS_DATA_STATE_CHANGE,
              payload: user,
            });
            // console.log(user);
            // dispatch(fetchUserFollowingPosts(user.uid));
          } else {
            console.log("does not exist");
          }
        });
      if (getPosts) {
        dispatch(fetchUserFollowingPosts(uid));
      }
    }
  };
};

export const fetchUserFollowingPosts = (uid) => {
  console.log("fetchUserFollowingPosts ");
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .get()
      .then((snapshot) => {
        const uid = snapshot.query.EP.path.segments[1];

        const user = getState().usersState.users.find((el) => el.uid === uid);

        let posts = snapshot.docs.map((doc) => {
          let data = doc.data();
          let id = doc.id;
          return {
            id,
            ...data,
            user,
          };
        });
        for (let i = 0; i < posts.length; ++i) {
          dispatch(fetchUserFollowingLikes(uid, posts[i].id));
        }
        dispatch({
          type: USERS_POSTS_STATE_CHANGE,
          payload: { posts, uid },
        });

        // get all global state
        // console.log("getState()");
        // console.log(getState());
      });
  };
};

export const fetchUserFollowingLikes = (uid, postId) => {
  console.log("fetchUserFollowingLIKe");
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        const postId = snapshot.ZE.path.segments[3];
        let currentUserLike = false;
        if (snapshot.exists) {
          currentUserLike = true;
        }
        dispatch({
          type: USERS_LIKES_STATE_CHANGE,
          payload: { postId, currentUserLike },
        });
      });
  };
};
