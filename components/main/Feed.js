import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as firebase from "firebase";

const windowWidth = Dimensions.get("window").width;

function Feed({
  currentUser,
  navigation,
  followingList,
  usersFollowingLoaded,
  feed,
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (
      usersFollowingLoaded === followingList.length &&
      followingList.length !== 0
    ) {
      //sort
      feed.sort((x, y) => {
        return x.creation - y.creation;
      });
      setPosts(feed);
      setLoading(false);
    }
    // if (posts) {
    //   console.log("post");
    //   console.log(posts[0]);
    // }
  }, [usersFollowingLoaded, feed]);

  const viewComment = (postId, uid) => {
    navigation.navigate("Comment", { postId, uid });
  };
  const likePosts = (postId, userId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };
  const dislikePosts = (postId, userId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  return <View />;
}
// <View style={styles.container}>
//       {loading === 0 ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         <View style={styles.containerGallery}>
//           <FlatList
//             numColumns={1}
//             horizontal={false}
//             data={posts}
//             renderItem={({ item }) => (
//               <View style={styles.containerImage}>
//                 <Image
//                   source={{ uri: item.downloadURL }}
//                   style={styles.image}
//                 />
//                 <Text onPress={() => viewComment(item.id, item.user.uid)}>
//                   View Comment ...
//                 </Text>
//               </View>
//             )}
//           />
//         </View>
//       )}
//     </View>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    height: windowWidth, //add this line, it can display on web
  },
  writer: {
    fontSize: 30,
    fontWeight: "600",
  },
  date: {
    fontSize: 20,
    fontWeight: "200",
    fontStyle: "italic",
  },
  caption: {
    fontSize: 40,
    fontWeight: "400",
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.userState.currentUser,
    followingList: state.userState.following,
    feed: state.usersState.feed,
    usersFollowingLoaded: state.usersState.usersFollowingLoaded,
  };
};

export default connect(mapStateToProps, null)(Feed);
