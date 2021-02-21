import React from "react";
import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import firebase from "firebase";
require("firebase/firestore");

export default function Comment({ route }) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (route.params.postId !== [postId]) {
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
          setComments(comments);
          setPostId(route.params.postId);
        });
    }
  }, [route.params.postId]);

  return (
    <View>
      <Text>commnetttt screennn</Text>
      <FlatList
        data={comments}
        horizontal={false}
        numColumns={1}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
}
