import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyeSheet, Alert } from "react-native";

const MyHeader = (props) => {
  return (
    <Header
      centerComponent={{
        text: props.title,
        style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
      }}
      backgroundColor="#eaf8fe"
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome"
          color="black"
          size={25}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      }
      rightComponent={
        <Icon
          name="bell"
          type="font-awesome"
          color="black"
          size={25}
          onPress={() => {
            props.navigation.navigate("Notification");
          }}
        />
      }
    />
  );
};

export default MyHeader;
