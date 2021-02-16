import firebase from "firebase";
import { USER_STATE_CHANGE } from "../constants";

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
