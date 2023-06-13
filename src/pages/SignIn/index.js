import React, {useState} from "react";
import { View, Text,TouchableOpacity, Platform } from "react-native";
import { 
  Container,
  Logo,
  Title,
  Input,
  ButtonArea,
  ButtonText
} from "./styles";

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";

function SignIn(){
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false);

  function handleLogin(){
    if(type){
      if(name === '' || email === '' || password === '') return;
      
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name
        })
        .then(() => {
          navigation.goBack();
        })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Esse email já está sendo usado!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('Email inválido!');
        }
      })

    }else{
      if(email === '' || password === '') return;

      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.log('Email inválido!');
        }
      })
    }
  }
  return(
    <Container>
      
      <Logo style={{ marginTop: Platform.OS === 'android' ? 60 : 80 }} >ChatGrup</Logo>
      <Title>Ajude, colabore, faça networking!</Title>

      { type && <Input
        placeholder="Seu nome"
        placeholderTextColor="#69696b"
        value={name}
        onChangeText={(text) => setName(text)}
        />
      }

      <Input
      placeholder="Seu email"
      placeholderTextColor="#69696b"
      value={email}
      onChangeText={(text) => setEmail(text)}
      />

      <Input
      placeholder="******"
      placeholderTextColor="#69696b"
      value={password}
      secureTextEntry={true}
      onChangeText={(text) => setPassword(text)}
      />

      <ButtonArea 
      style={{ backgroundColor: type ? "#f53745" : "#46d478" }} 
      onPress={handleLogin}
      >
        <ButtonText>{type ? "Cadastrar" : "Acessar"}</ButtonText>
      </ButtonArea>

      <TouchableOpacity onPress={() => setType(!type)} >
        <Text>{type ? "Já possuo uma conta" : "Criar uma nova conta"}</Text>
      </TouchableOpacity>


    </Container>
  )
}

export default SignIn;