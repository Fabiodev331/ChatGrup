import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { 
    Container,
    Modal,
    ModalContent,
    Text,
    TextInput,
    ButtonCreate,
    ButtonText
} from "./styles";

function ModalNewRoom({ setVisible }){
    const [roomName, setRoomName] = useState('')
    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible} >
                <Modal></Modal>
            </TouchableWithoutFeedback>
            
            <ModalContent>
                <Text>Criar novo grupo?</Text>
                <TextInput
                value={roomName}
                onchageText={(text) => setRoomName(text) }
                placeholder="Nome do grupo"
                />

                <ButtonCreate>
                    <ButtonText>Criar sala</ButtonText>
                </ButtonCreate>
            </ModalContent>
            
        </Container>
    )
}

export default ModalNewRoom;