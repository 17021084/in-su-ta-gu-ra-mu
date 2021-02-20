import React from "react";
import { useState, useRef } from "react";
import { View, Text } from "react-native";

import * as firebase from "firebase";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
export default function Search({ navigation }) {
  const inputTimeOut = useRef(null);
  const [users, setUsers] = useState([]);
  const fetchUser = (search) => {
    //Debounce, reduce request to server
    if (inputTimeOut.current) {
      clearTimeout(inputTimeOut.current);
    }
    inputTimeOut.current = setTimeout(() => {
      firebase
        .firestore()
        .collection("users")
        .where("name", ">=", search)
        .get()
        .then((snapshot) => {
          let users = snapshot.docs.map((doc) => {
            let data = doc.data();
            let id = doc.id;
            return { id, ...data };
          });
          setUsers(users);
        });
    }, 500);
  };
  return (
    <View>
      <TextInput placeholder="seach...." onChangeText={fetchUser} />
      <FlatList
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile", { uid: item.id });
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={1}
        horizontal={false}
        data={users}
      />
    </View>
  );
}
