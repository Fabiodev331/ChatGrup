import React, { useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { 
  Container,
  FlatList,
  KeyboardAvoidingView,
  ContainerInput,
  MainInput,
  TextInput,
  Button,
  ButtonView,
} from "./styles";

import Feather from 'react-native-vector-icons/Feather';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import ChatMessage from "../../components/ChatMessage";

function Messages({ route }){
  const { thread } = route.params;
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState('');

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

  async function handleSend(){
    if(input === '') return;

    await firestore().collection('MESSAGE_THREADS')
    .doc(thread._id)
    .collection('MESSAGE')
    .add({
      text: input,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: user.uid,
        displayName: user.displayName
      }
    })

    await firestore().collection('MESSAGE_THREADS')
    .doc(thread._id)
    .set(
      {
        lastMessage: {
          text: input,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      },
      { merge: true }
    )
      setInput('');
  }

  return(
    <Container>
      <FlatList
        data={message}
        keyExtractor={item => item._id}
        renderItem={({item}) => <ChatMessage data={item} /> }
        inverted={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ContainerInput>
          <MainInput>
            <TextInput
              placeholder="Sua mensagem..."
              value={input}
              onChangeText={(text) => setInput(text)}
              multiline={true}
              autoCorrect={false}
            />
          </MainInput>

          <Button onPress={handleSend} >
            <ButtonView>
              <Feather name="send" size={22} color="#fff" />
            </ButtonView>
          </Button>

        </ContainerInput>

      </KeyboardAvoidingView>
    </Container>
  )
}

export default Messages;