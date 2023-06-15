import React, { useState, useEffect } from "react";
import { Modal } from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { 
  Container,
  HeaderRoom,
  HeaderRoomLeft,
  ButtonLeft,
  Title,
  ButtonRight,
  
} from "./styles";

import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FabButton from "../../components/FabButton";
import ModalNewRoom from "../../components/ModalNewRoom";

function ChatRoom(){
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [threadsList, setThreadsList] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    console.log(hasUser)

    setUser(hasUser);

  }, [isFocused]);

  useEffect(()=>{
    let isActive = true;

    function getChat(){
      firestore().collection('MESSAGE_THREADS')
      .orderBy('lastMessage.creaedAd', 'desc')
      .limit(10)
      .get()
      .then((snapshot)=>{
        const threads = snapshot.docs.map( docSnapshot => {
          return {
            _id: docSnapshot.id,
            name: '',
            lastMessage: { text: '' },
            ...docSnapshot.data()
          }
        })

        if(isActive){
          setThreadsList(threads);
          setLoading(false);
        }
        
      })
    }

    getChat();

    return ()=>{
      isActive = false;
    }

  },[isFocused])


  function handleSignOut(){
    auth()
    .signOut()
    .then(() => {
      setUser(null);
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

          { user && (
            <ButtonLeft onPress={handleSignOut} >
            <MaterialIcons name="arrow-back" size={28} color="#FFF" />
          </ButtonLeft>
          )}

          <Title>Grupos</Title>

        </HeaderRoomLeft>

        <ButtonRight>
          <MaterialIcons name="search" size={28} color="#FFF" />
        </ButtonRight>

      </HeaderRoom>
      
      <FabButton setVisible={ () => setModalVisible(true)} userStatus={user} />

      <Modal visible={modalVisible} animationType="fade" transparent={true} >
        <ModalNewRoom setVisible={ () => setModalVisible(false) } />
      </Modal>

    </Container>
  )
}

export default ChatRoom;