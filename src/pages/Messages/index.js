import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { 
  Container,
  FlatList,
  KeyboardAvoidingView,
  ContainerInput,
  MainInput,
  TextInput
} from "./styles";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import ChatMessage from "../../components/ChatMessage";

function Messages({ route }){
  const { thread } = route.params;
  const [message, setMessage] = useState([]);

  const user = auth().currentUser.toJSON();

  useEffect( () => {
    const unsubscribeListener = firestore().collection('MESSAGE_THREADS')
    .doc(thread._id)
    .collection('MESSAGE')
    .orderBy('createdAt', 'desc')
    .onSnapshot( querySnapshot => {
      const messages = querySnapshot.docs.map( doc => {
        const firebaseData = doc.data()

        const data = {
          _id: doc.id,
          text: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
          ...firebaseData
        }

        if(!firebaseData.system){
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.displayName
          }
        }

        return data;

      })
      setMessage(messages);
    })

    return () => unsubscribeListener();
  }, [] );

  return(
    <Container>
      <FlatList
        data={message}
        keyExtractor={item => item._id}
        renderItem={({item}) => <ChatMessage data={item} /> }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ContainerInput>
          <MainInput>
            <TextInput
              placeholder="Sua mensagem..."
            />
              </MainInput>
        </ContainerInput>

      </KeyboardAvoidingView>
    </Container>
  )
}

export default Messages;