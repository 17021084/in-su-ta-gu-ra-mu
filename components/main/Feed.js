import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";

export default class Feed extends Component {
  signOut() {
    firebase.auth().signOut();
  }
  render() {
    return (
      <View>
        <MaterialCommunityIcons name="home" size={32} color="green" />
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
        <Button title="logout" onPress={this.signOut.bind(this)} />
      </View>
    );
  }
}
