import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { 
  Container,
  ContainerInput,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "./styles";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useIsFocused } from "@react-navigation/native";

import ChatList from "../../components/ChatList";

function Search(){
  const isFocused = useIsFocused();
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState([]);


  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);

  }, [isFocused])

  async function handleSearch(){
    if(input === '') return;

    const responseSearch = await firestore()
    .collection("MESSAGE_THREADS")
    .where('name', '>=', input)
    .where('name', '<=', input + '\uf8ff')
    .get()
    .then((querysnapshot)=> {
      const threads = querysnapshot.docs.map( docsnapshot => {
        return{
          _id: docsnapshot.id,
          name: '',
          lastMessage: { text: ''},
          ...docsnapshot.data()
        }
      })
      setChat(threads);
      setInput('');
      Keyboard.dismiss();
    })
  }

  return(
    <Container>
      <ContainerInput>
        <TextInput
          placeholder="Qual nome da sala?"
          value={input}
          onChangeText={(text) => setInput(text)}
          autoCapitalize={'none'}
        />

        <TouchableOpacity onPress={handleSearch} >
          <MaterialIcons name="search" size={30} color="#FFF" />
        </TouchableOpacity>

      </ContainerInput>

      <FlatList
      data={chat}
      keyExtractor={ item => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={ ({item}) =>  <ChatList data={item} userStatus={user} /> }
      />

    </Container>
  )
}

export default Search;