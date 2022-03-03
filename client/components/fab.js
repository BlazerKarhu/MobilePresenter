// https://github.com/santomegonzalo/react-native-floating-action
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { FloatingAction } from "react-native-floating-action";

const defaultActions = [
  {
    text: "Post",
    icon: require("../assets/adaptive-icon.png"),
    name: "bt_post"
  },
  {
    text: "Tag",
    icon: require("../assets/favicon.png"),
    name: "bt_tag"
  }
];

const fab = () => {
  // Bug: Horizontal scroll appears on web if actions exists when not opened. Thus state is needed.
  const [actions, setActions] = React.useState(undefined);

  return (
    <FloatingAction
      actions={actions}
      onClose={() => {
        setActions(undefined)
      }}
      onOpen={() => {
        setActions(defaultActions)
      }}
      onPressItem={name => {
        console.log(`selected button: ${name}`);
      }}
    />)

}

const styles = StyleSheet.create({
  container: {

  },
});

export default fab