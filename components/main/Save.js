import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const containerPadding = 10;

export default function Save({ route }) {
  const image = route.params.image;
  const [caption, setCaption] = useState("");
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
      <Button style={styles.button} title="upload" />
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
