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

function SignIn(){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false);

  return(
    <Container>
      
      <Logo style={{ marginTop: Platform.OS === 'android' ? 60 : 80 }} >ChatGrup</Logo>
      <Title>Ajude, colabore, faça networking!</Title>

      { type && <Input
        placeholder="Seu nome"
        placeholderTextColor="#69696b"
        value={nome}
        onChangeText={(text) => setNome(text)}
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

      <ButtonArea style={{ backgroundColor: type ? "#f53745" : "#57dd86" }} >
        <ButtonText>{type ? "Cadastrar" : "Acessar"}</ButtonText>
      </ButtonArea>

      <TouchableOpacity onPress={() => setType(!type)} >
        <Text>{type ? "Já possuo uma conta" : "Criar uma nova conta"}</Text>
      </TouchableOpacity>


    </Container>
  )
}

export default SignIn;