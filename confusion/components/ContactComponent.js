import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import React, { Component } from "react";

class Contact extends Component {
  static navigationOptions = {
    title: "Contact"
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Card title="Contact Information">
        <View>
          <Text style={{ textAlign: "left" }}>
            121, Clear Water Bay Road {"\n"}
            {"\n"}
            Clear Water Bay, Kowloon {"\n"}
            {"\n"}
            HONG KONG{"\n"}
            {"\n"}
            Tel: +852 1234 5678{"\n"}
            {"\n"}
            Fax: +852 8765 4321 {"\n"}
            {"\n"}
            Email:confusion@food.net{"\n"}
          </Text>
        </View>
      </Card>
    );
  }
}

export default Contact;
