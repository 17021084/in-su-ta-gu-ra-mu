import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions";
import { bindActionCreators } from "redux";
import firebase from "firebase";
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
    console.log(this.props.currentUser);
    return (
      <View>
        <Button title={"logout"} onPress={this.onPressLogOut.bind(this)} />
      </View>
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
