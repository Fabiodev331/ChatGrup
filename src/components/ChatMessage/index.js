import React, { useMemo } from "react";
import { View, Text, Platform } from "react-native";
import { 
    Container,
    MessageView,
    Name,
    Message,
 } from "./styles";

import auth from '@react-native-firebase/auth';

function ChatMessage({data}){
    const user = auth().currentUser.toJSON();

    const isMyMessage = useMemo(() => {
        return data?.user?._id === user.uid
    }, [data] )
    
    return(
        <Container>
            <MessageView 
            style={{
                backgroundColor: isMyMessage ? '#DCF8C5' : '#FFF',
                marginLeft: isMyMessage ? 50 : 0,
                marginRight: isMyMessage ? 0 : 50,
            }}
            >
                {!isMyMessage && <Name>{data?.user?.displayName}</Name>}
                
                <Message>{data.text}</Message>
            </MessageView>

        </Container>
    )
}

export default ChatMessage;