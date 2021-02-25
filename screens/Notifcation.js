import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import { FlatList } from "react-native-gesture-handler";

export default class Notification extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotification: [],
    };
    this.Notification = null;
  }

  getNotification = () => {
    this.Notification = db
      .collection("AllNotifications")
      .where("Notification", "==", "UnRead")
      .where("targetedUserId", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allNotification = [];
        snapshot.docs.map((doc) => {
          var Notifcation = doc.data();
          Notification["doc_id"] = doc.id;
          allNotification.push(Notification);
        });
        this.setState({
          allNotification: allNotification,
        });
      });
  };

  componentDidMount = () => {
    this.getNotification();
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.message}
        leftElement={
          <Icon
            name="book-bookmark"
            type="foundation"
            color="black"
            size={25}
          />
        }
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View>
        <MyHeader title="Notifications" navigation={this.props.navigation}/>
        <View>
          {this.state.allNotification.length === 0 ? (
            <View>
              <Text>Unfortunatly you have no notifications</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allNotification}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
