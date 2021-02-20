import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
// wildcard import
import * as firebase from "firebase";
import { connect } from "react-redux";
import { addPost } from "../../redux/actions";

const windowWidth = Dimensions.get("window").width;
const containerPadding = 10;

function Save({ route, navigation }) {
  const image = route.params.image;
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    // get image
    const response = await fetch(image);
    // convert to blob = binary large object
    const blob = await response.blob();
    //random image name,it prevent same name cause error
    const childPath = `posts/${firebase.auth().currentUser.uid}/${Math.random(
      36
    ).toString()}`;

    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`progess : ${snapshot.bytesTransferred}`);
    };
    const taskError = (snapshot) => {
      console.log("error upload image");
      console.log(snapshot);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };

    //Progress status
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        const id = res.ZE.path.segments.pop();
        const creation = Date.now();
        const newPost = {
          id,
          creation,
          downloadURL,
          caption,
        };
        // console.log(newPost);
        addPost(newPost);
        navigation.navigate("Feed");
      })
      .catch((error) => console.log(error));
  };

  //fix keyboard hide in put field, search :KeyboardAvoidingView
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => {
          setCaption(text);
        }}
        value={caption}
        placeholder="What are you thinking ?"
        style={styles.input}
        multiline={true}
      />
      <Image source={{ uri: image }} style={styles.image} />
      <Button style={styles.button} onPress={uploadImage} title="upload" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: containerPadding,
  },
  image: {
    width: windowWidth - 2 * containerPadding,
    height: windowWidth,
    borderRadius: 30,
    marginVertical: 20,
  },
  input: {
    paddingHorizontal: 20,
    marginVertical: 20,
    height: 150,
    borderColor: "pink",
    borderWidth: 1,
    borderRadius: 30,
  },
});

export default connect(null, { addPost })(Save);
