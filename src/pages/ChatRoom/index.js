import React from "react";
import { View, Text, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";

function ChatRoom(){
  const navigation = useNavigation();

  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
      <Text>ChatRoom</Text>
      <Button title="login" onPress={() => navigation.navigate('SignIn') } />
    </View>
  )
}

export default ChatRoom;