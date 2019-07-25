import React, { Component } from "react";

import {
  View,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
  Text
} from "react-native";
import App from "./components/MainComponent";
export default class HelloWorldApp extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <App />
      </View>
    );
  }
}
