import React, { Component } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Add extends Component {
  render() {
    return (
      <View>
        <MaterialCommunityIcons name="home" size={32} color="green" />
        <Ionicons name="md-checkmark-circle" size={32} color="green" />;
      </View>
    );
  }
}
