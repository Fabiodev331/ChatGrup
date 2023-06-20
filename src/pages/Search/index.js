import React, { useState } from "react";
import { View, Text } from "react-native";
import { 
  Container,
  ContainerInput,
  TextInput,
  TouchableOpacity,

} from "./styles";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Search(){
  const [input, setInput] = useState('');

  return(
    <Container>
      <ContainerInput>
        <TextInput
          placeholder="Qual nome da sala?"
          value={input}
          onChangeText={(text) => setInput(text)}
          autoCapitalize={'none'}
        />

        <TouchableOpacity>
          <MaterialIcons name="search" size={30} color="#FFF" />
        </TouchableOpacity>

      </ContainerInput>
    </Container>
  )
}

export default Search;