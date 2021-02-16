import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
        />

        <Button title={"Sign up"} onPress={() => this.onSignUp()} />
      </View>
    );
  }
}
