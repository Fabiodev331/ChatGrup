import React from "react";
import { View, Text, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { 
  Container,
  HeaderRoom,
  HeaderRoomLeft,
  ButtonLeft,
  Title,
  ButtonRight,
  
} from "./styles";

import auth from '@react-native-firebase/auth';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function ChatRoom(){
  const navigation = useNavigation();

  function handleSignOut(){
    auth()
    .signOut()
    .then(() => {
      navigation.navigate('SignIn')
    })
    .catch(() => {
      console.log("Não possui nenhum usuário");
    })
  }

  return(
    <Container>
      <HeaderRoom>
        <HeaderRoomLeft>

          <ButtonLeft onPress={handleSignOut} >
            <MaterialIcons name="arrow-back" size={28} color="#FFF" />
          </ButtonLeft>

          <Title>Grupos</Title>

        </HeaderRoomLeft>

        <ButtonRight>
          <MaterialIcons name="search" size={28} color="#FFF" />
        </ButtonRight>

      </HeaderRoom>
      
      <Button title="login" onPress={() => navigation.navigate('SignIn') } />
    </Container>
  )
}

export default ChatRoom;