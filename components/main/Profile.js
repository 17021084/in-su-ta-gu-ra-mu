import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as firebase from "firebase";

const windowWidth = Dimensions.get("window").width;

function Profile({ currentUser, posts, route }) {
  const userParamsId = route.params.uid;
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log(currentUser);
    // console.log(route.params.uid);
    // if (userParamsId === firebase.auth().currentUser.uid) {
    //   setUser(currentUser);
    //   setUserPosts(posts);
    // } else {
    console.log("profile else");
    firebase
      .firestore()
      .collection("users")
      .doc(userParamsId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log("user doesnt exists");
        }
      });
    firebase
      .firestore()
      .collection("posts")
      .doc(userParamsId)
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
        setUserPosts(posts);
      });
    // }
  }, [userParamsId]);

  if (user === null) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfor}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image source={{ uri: item.downloadURL }} style={styles.image} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfor: {
    marginVertical: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    height: windowWidth / 3, //add this line, it can display on web
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.userState.currentUser,
    posts: state.userState.posts,
  };
};

export default connect(mapStateToProps, null)(Profile);
