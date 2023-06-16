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

function ModalNewRoom({ setVisible, setUpdateScreen }){
    const [roomName, setRoomName] = useState('')

    const user = auth().currentUser.toJSON();

    function handleCreateRoom(){
        if(roomName === '') return;

        firestore().collection('MESSAGE_THREADS')
        .get()
        .then((snapshot)=>{
            let myThreads = 0;

            snapshot.docs.map( docItem => {
                if(docItem.data().owner === user.uid){
                    myThreads += 1;
                }
            })

            if(myThreads >= 4){
                alert('Você já atingiu o limite de grupos por usuário.')
            }else{
                CreateRoom();
            }

        })
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
                setUpdateScreen();
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