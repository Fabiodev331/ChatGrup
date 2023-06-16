import React from "react";
import { 
    ListGrup,
    ListArea,
    Title,
    FraseText,

} from "./styles";

import { useNavigation } from "@react-navigation/native";

function ChatList({ data, deleteRoom, userStatus }){
    const navigation = useNavigation();

    function openChat(){
        if(userStatus){
            navigation.navigate("Messages", { thread: data });
        }else{
            navigation.navigate("SignIn");
        }
        
    }

    return(
        <ListGrup onPress={ openChat } onLongPress={ () => deleteRoom && deleteRoom() } >
            <ListArea>
                <Title numberOfLines={1} >{ data.name }</Title>
                <FraseText  numberOfLines={1} >{ data.lastMessage.text }</FraseText>
            </ListArea>
        </ListGrup>
    );
}

export default ChatList;