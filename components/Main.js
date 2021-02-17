import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions";
import { bindActionCreators } from "redux";
import firebase from "firebase";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feed from "./main/Feed";
import Profile from "./main/Profile";
import Add from "./main/Add";

const BottonTab = createMaterialBottomTabNavigator();
const BottonIconSizes = 25;

const AddNull = () => null;

class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  onPressLogOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out");
      })
      .catch();
  }

  render() {
    // null ... result because in first render Didmount didnt run
    // <Button title={"logout"} onPress={this.onPressLogOut.bind(this)} />
    return (
      <BottonTab.Navigator initialRouteName="Feed">
        <BottonTab.Screen
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add_No_Buttom_Tab"); //in previous stack screen
            },
          })}
          name={"Add"} // it doesnt have botton bar, because it in previous stack screen
          component={AddNull}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-box"
                size={BottonIconSizes}
                color={color}
              />
            ),
          }}
        />
        <BottonTab.Screen
          name={"Feed"}
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                size={BottonIconSizes}
                color={color}
              />
            ),
          }}
        />
        <BottonTab.Screen
          name={"Profile"}
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                size={BottonIconSizes}
                color={color}
              />
            ),
          }}
        />
      </BottonTab.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
