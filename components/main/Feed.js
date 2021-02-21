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

function Feed({ currentUser, navigation, followingList, usersLoaded, users }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let posts = [];
    if (usersLoaded === followingList.length) {
      for (let i = 0; i < followingList.length; ++i) {
        const user = users.find((el) => el.uid === followingList[i]);

        if (user) {
          posts = [...posts, ...user.posts];
        }
      }
      //sort
      posts.sort((x, y) => {
        return x.creation - y.creation;
      });
      setPosts(posts);
      setLoading(false);
    }
  }, [usersLoaded]);

  const viewComment = (postId, uid) => {
    navigation.navigate("Comment", { postId, uid });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.containerGallery}>
          <FlatList
            numColumns={1}
            horizontal={false}
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.containerImage}>
                <Text style={styles.writer}>{item.user.name}</Text>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.date}>
                  {new Date(item.creation.seconds).toLocaleDateString()}
                </Text>
                <Image
                  source={{ uri: item.downloadURL }}
                  style={styles.image}
                />
                <Text onPress={() => viewComment(item.id, item.user.uid)}>
                  View Comment ...
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

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
    users: state.usersState.users,
    usersLoaded: state.usersState.usersLoaded,
  };
};

export default connect(mapStateToProps, null)(Feed);
