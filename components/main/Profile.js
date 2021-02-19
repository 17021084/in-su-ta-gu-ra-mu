import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { FlatList, ScrollView } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;

function Profile({ currentUser, posts }) {
  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.containerInfor}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
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
    height: windowWidth / 3,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.userState.currentUser,
    posts: state.userState.posts,
  };
};

export default connect(mapStateToProps, null)(Profile);
