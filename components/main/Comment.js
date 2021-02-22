import React from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
require("firebase/firestore");
import { fetchUsersData } from "../../redux/actions";

function Comment({ route, users, fetchUsersData }) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    // console.log(users);
    function matchUserToComment(comments) {
      for (let i = 0; i < comments.length; ++i) {
        if (comments[i].hasOwnProperty("user")) {
          continue;
        }

        const user = users.find((x) => x.uid === comments[i].creator);
        // neu ko co user dang follow  thi fetch ve va ko lay post nua
        if (user === undefined) {
          fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }

    if (route.params.postId !== postId) {
      firebase
        .firestore()
        .collection("posts")
        .doc(route.params.uid)
        .collection("userPosts")
        .doc(route.params.postId)
        .collection("comments")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComment(comments);
        });
      setPostId(route.params.postId);
    } else {
      matchUserToComment(comments);
    }
  }, [route.params.postId, users]);

  const postComments = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(route.params.uid)
      .collection("userPosts")
      .doc(route.params.postId)
      .collection("comments")
      .add({
        creator: firebase.auth().currentUser.uid,
        text,
      });
  };

  return (
    <View>
      <Text>Leave your comment in here!! </Text>
      <View>
        <TextInput
          placeholder="what are you thinking..."
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        />
        <Button title="submit" onPress={postComments} />
      </View>
      <FlatList
        data={comments}
        horizontal={false}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            {item.user !== undefined ? <Text>{item.user.name} </Text> : null}
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.usersState.users,
  };
};

export default connect(mapStateToProps, { fetchUsersData })(Comment);
