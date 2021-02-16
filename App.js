import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import * as firebase from "firebase";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const Stack = createStackNavigator();

// hide this in env file in furture
const firebaseConfig = {
  apiKey: "AIzaSyBG0PpStd7JHoSzY14Fs-crU5ZKI1aryH0",
  authDomain: "instagram-5ca5e.firebaseapp.com",
  projectId: "instagram-5ca5e",
  storageBucket: "instagram-5ca5e.appspot.com",
  messagingSenderId: "446228072719",
  appId: "1:446228072719:web:f71959472226550d1d167a",
  measurementId: "G-BMJSLEMG0Z",
};

// make sure that no instance run when initializel App
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, loaded: true });
      } else {
        this.setState({ loggedIn: false, loaded: true });
      }
    });
  }
  render() {
    const { loaded, loggedIn } = this.state;
    if (!loaded) {
      return (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    // logged in
    return <Text> logged in </Text>;
  }
}

export default App;
