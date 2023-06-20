import React, { useState, useEffect } from "react";
import { Modal, View, ActivityIndicator, Alert } from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { 
  Container,
  HeaderRoom,
  HeaderRoomLeft,
  ButtonLeft,
  Title,
  ButtonRight,
  FlatList
} from "./styles";

import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FabButton from "../../components/FabButton";
import ModalNewRoom from "../../components/ModalNewRoom";
import ChatList from "../../components/ChatList";

function ChatRoom(){
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [threadsList, setThreadsList] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(()=> {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;

    setUser(hasUser);

  }, [isFocused]);

  useEffect(()=>{
    let isActive = true;

    function getChat(){
      firestore().collection('MESSAGE_THREADS')
      .orderBy('lastMessage.createdAt', 'desc')
      .limit(10)
      .get()
      .then((snapshot)=>{
        const threads = snapshot.docs.map( documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            lastMessage: { text: '' },
            ...documentSnapshot.data()
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

  },[isFocused, updateScreen])


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

  function deleteRoom(ownerId, idRoom){
    if(ownerId !== user?.uid) return;
    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja deletar essa sala?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Deletar",
          onPress: () => handleDelete(idRoom),
        }
      ]
    )
  }

  async function handleDelete(idRoom){
    await firestore()
    .collection("MESSAGE_THREADS")
    .doc(idRoom)
    .delete();

    setUpdateScreen(!updateScreen);
  }


  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <ActivityIndicator size={45} color='#2e54d4' />
      </View>
    )
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

        <ButtonRight onPress={() => navigation.navigate("Search")}>
          <MaterialIcons name="search" size={28} color="#FFF" />
        </ButtonRight>

      </HeaderRoom>

      <FlatList
        data={threadsList}
        keyExtractor={ item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={ ({item}) => (
          <ChatList 
          data={item} 
          deleteRoom={ () => deleteRoom(item.owner, item._id)}
          userStatus={user}
          />
        ) }
      />
      
      <FabButton setVisible={ () => setModalVisible(true)} userStatus={user} />

      <Modal visible={modalVisible} animationType="fade" transparent={true} >
        <ModalNewRoom 
        setVisible={ () => setModalVisible(false) } 
        setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>

    </Container>
  )
}

export default ChatRoom;