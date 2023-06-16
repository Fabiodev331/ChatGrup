import React from "react";
import { View, Text } from "react-native";

function Messages({ route }){
  const { thread } = route.params;
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
      <Text>{ thread.name }</Text>
    </View>
  )
}

export default Messages;