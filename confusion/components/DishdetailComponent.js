import { Card, Icon, Input, Rating } from "react-native-elements";
import React, { Component } from "react";
import { Text, View, ScrollView, Button, FlatList, Modal } from "react-native";
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
            onPress={() => props.onPressModal()}
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
  markFavorite = dishId => {
    this.setState({ favorites: this.state.favorites.concat(dishId) });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleModalOpen = () => {
    this.toggleModal();
  };
  submitComment = () => {};

  resetForm = () => {};

  ratingCompleted = rating => {
    this.setState({
      rating: rating
    });
    console.log("Rating is: " + this.state.rating);
  };
  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.state.dishes[+dishId]}
          favorite={this.state.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          onPressModal={() => this.handleModalOpen()}
        />
        <RenderComments
          comments={this.state.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View
            stye={{
              justifyContent: "center",
              margin: 20
            }}
          >
            <Text>Rating</Text>
            <Rating
              type="star"
              ratingCount={5}
              startingValue={this.state.rating}
              imageSize={40}
              showRating
              onFinishRating={this.ratingCompleted}
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "chevron-left" }}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "chevron-left" }}
            />
            <Button
              onPress={() => {
                this.toggleModal();
                this.submitComment();
                this.resetForm();
              }}
              color="#512DA8"
              title="Submit"
            />
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="#512DA8"
              title="Cancel"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default DishDetail;
