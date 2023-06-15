import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { 
    Container,
    Modal,
    ModalContent,
    Text,
    TextInput,
    ButtonCreate,
    ButtonText,
    ButtonBack,
    ButtonBackText
} from "./styles";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

function ModalNewRoom({ setVisible }){
    const [roomName, setRoomName] = useState('')

    const user = auth().currentUser.toJSON();

    function handleCreateRoom(){
        if(roomName === '') return;

        CreateRoom();
    }

    function CreateRoom(){
        firestore().collection('MESSAGE_THREADS')
        .add({
            name: roomName,
            owner: user.uid,
            lastMessage: {
                text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
            } 
        })
        .then((docRef) => {
            docRef.collection('MESSAGE')
            .add({
                text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
                system: true,
            })
            .then(()=>{
                setVisible();
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible} >
                <Modal></Modal>
            </TouchableWithoutFeedback>
            
            <ModalContent>
                <Text>Criar novo grupo?</Text>
                <TextInput
                placeholder="Nome do grupo"
                value={roomName}
                onChangeText={(text) => setRoomName(text)}
                />

                <ButtonCreate onPress={handleCreateRoom} >
                    <ButtonText>Criar sala</ButtonText>
                </ButtonCreate>

                <ButtonBack onPress={setVisible} >
                    <ButtonBackText>Voltar</ButtonBackText>
                </ButtonBack>
            </ModalContent>
            
        </Container>
    )
}

export default ModalNewRoom;