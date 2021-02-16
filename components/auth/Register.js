import React, { Component } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
        />
      </View>
    );
  }
}
