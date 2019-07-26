import React, { Component } from "react";

import {
  View,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
  Text
} from "react-native";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();
export default class HelloWorldApp extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <Provider store={store}>
          <Main />
        </Provider>
      </View>
    );
  }
}
