import { Card, Icon, Input, Rating, Button } from "react-native-elements";
import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, Modal } from "react-native";
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
        <Rating
          imageSize={10}
          readonly
          startingValue={item.rating}
          style={{ flex: 1, flexDirection: "row" }}
        />

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
      rating: 5,
      author: "Author",
      comment: "Comment"
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
    this.setState({ showModal: true });
  };
  handleModalClose = () => {
    this.setState({ showModal: false });
  };
  // handelAuthorChange = () => {};
  // handelCommentChange = () => {};
  submitComment = () => {
    console.log("submit");

    console.log(this.state.author);
    console.log(this.state.comment);
    this.handleModalClose();
  };

  resetForm = () => {
    this.setState({ author: "Author", comment: "Comment" });
    console.log("reset");
    console.log(this.state.author);
    console.log(this.state.comment);
    this.handleModalClose();
  };

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
          onDismiss={() => this.handleModalClose()}
          onRequestClose={() => this.handleModalClose()}
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
              placeholder={this.state.author}
              leftIcon={
                <Icon name="user" type="font-awesome" style={{ margin: 3 }} />
              }
              onChangeText={text => this.setState({ author: text })}
            />
            <Input
              placeholder={this.state.comment}
              leftIcon={
                <Icon
                  name="comment"
                  type="font-awesome"
                  style={{ margin: 3 }}
                />
              }
              onChangeText={text => this.setState({ comment: text })}
            />
            <Button
              onPress={() => {
                this.submitComment();
              }}
              color="#520da6"
              title="Submit"
              style={{ margin: 10, padding: 10 }}
            />
            <Button
              onPress={() => {
                this.resetForm();
              }}
              color="#626163"
              title="Cancel"
              style={{ margin: 10, padding: 10 }}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default DishDetail;
