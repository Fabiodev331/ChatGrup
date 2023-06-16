import React from "react";
import { 
    AreaButton,
} from "./styles";

import Feather from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";

function FabButton({ setVisible, userStatus }){
    const navigation = useNavigation();

    function handleNavigationButton(){
    userStatus ? setVisible() : navigation.navigate("SignIn")
    }

    return(
        <AreaButton
        activeOpacity={0.8}
        onPress={handleNavigationButton}
        >
            <Feather name='plus' size={35} color='#FFF' />
        </AreaButton>
    )
}

export default FabButton;