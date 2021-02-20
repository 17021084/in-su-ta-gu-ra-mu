import firebase from "firebase";
import {
  USER_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
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
  console.log("add posssssst");
  return {
    type: USER_POST_STATE_CHANGE,
    payload: posts,
  };
};
