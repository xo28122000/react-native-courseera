import { Card, Icon } from "react-native-elements";
import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already favorite") : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#f50"
            onPress={handleModalOpen()}
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}
function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}
class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: [],
      showModal: false,
      rating: 5
    };
  }

  static navigationOptions = {
    title: "Dish Details"
  };
  markFavorite(dishId) {
    this.setState({ favorites: this.state.favorites.concat(dishId) });
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleModalOpen() {
    this.toggleModal();
  }

  resetForm() {}
  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.state.dishes[+dishId]}
          favorite={this.state.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.state.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

export default DishDetail;
