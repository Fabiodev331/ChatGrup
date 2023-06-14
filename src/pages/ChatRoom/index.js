import React, { useState } from "react";
import { Modal } from "react-native";

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
import FabButton from "../../components/FabButton";
import ModalNewRoom from "../../components/ModalNewRoom";

function ChatRoom(){
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

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
      
      <FabButton setVisible={ () => setModalVisible(true) } />

      <Modal visible={modalVisible} animationType="fade" transparent={true} >
        <ModalNewRoom setVisible={ () => setModalVisible(false) } />
      </Modal>

    </Container>
  )
}

export default ChatRoom;